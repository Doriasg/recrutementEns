@extends('layouts.examiner')

@section('title', 'INSTI - Évaluations des Candidatures')

@section('content')
    <!-- HEADER -->
    <header class="page-header">
        <div class="container">
            <h1>Évaluations des Candidatures</h1>
            <p>Examinez et évaluez les candidatures soumises</p>
        </div>
    </header>

    <!-- FILTERS SECTION -->
    <section class="filters-section">
        <div class="container">
            <div class="filters-card">
                <div class="filter-grid">
                    <div class="filter-group">
                        <label>Statut</label>
                        <select id="filterStatus">
                            <option value="all">Tous les statuts</option>
                            <option value="pending">En attente</option>
                            <option value="in_progress">En cours</option>
                            <option value="completed">Terminées</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Département</label>
                        <select id="filterDepartment">
                            <option value="all">Tous les départements</option>
                            <option value="electrique">Génie Électrique</option>
                            <option value="informatique">Informatique</option>
                            <option value="mecanique">Génie Mécanique</option>
                            <option value="civil">Génie Civil</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Priorité</label>
                        <select id="filterPriority">
                            <option value="all">Toutes priorités</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">Haute</option>
                            <option value="normal">Normale</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Date de soumission</label>
                        <select id="filterDate">
                            <option value="all">Toutes dates</option>
                            <option value="today">Aujourd'hui</option>
                            <option value="week">Cette semaine</option>
                            <option value="month">Ce mois</option>
                        </select>
                    </div>
                    <button class="btn-apply-filter">
                        <i class="fas fa-filter"></i> Appliquer
                    </button>
                    <button class="btn-reset-filter">
                        <i class="fas fa-redo"></i> Réinitialiser
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- EVALUATIONS LIST -->
    <section class="evaluations-section">
        <div class="container">
            <div class="section-header">
                <h2><i class="fas fa-list-check"></i> Candidatures à évaluer (12)</h2>
                <div class="actions">
                    <button class="btn-export">
                        <i class="fas fa-download"></i> Exporter
                    </button>
                    <button class="btn-bulk">
                        <i class="fas fa-tasks"></i> Actions groupées
                    </button>
                </div>
            </div>

            <div class="evaluations-table-container">
                <table class="evaluations-table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" id="selectAll">
                            </th>
                            <th>Candidat</th>
                            <th>Offre</th>
                            <th>Département</th>
                            <th>Score</th>
                            <th>Statut</th>
                            <th>Priorité</th>
                            <th>Date soumission</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Row 1 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="select-row">
                            </td>
                            <td>
                                <div class="candidate-cell">
                                    <div class="candidate-avatar">
                                        <i class="fas fa-user-graduate"></i>
                                    </div>
                                    <div class="candidate-info">
                                        <strong>Dr. ADJOVI Jean</strong>
                                        <span>jeanadjovi@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <strong>Enseignant Génie Électrique</strong>
                                <span class="text-muted">REF: INSTI-2025-GE-001</span>
                            </td>
                            <td>Génie Électrique</td>
                            <td>
                                <span class="score-badge score-high">85/100</span>
                            </td>
                            <td>
                                <span class="status-badge status-pending">En attente</span>
                            </td>
                            <td>
                                <span class="priority-badge priority-urgent">
                                    <i class="fas fa-exclamation-circle"></i> Urgent
                                </span>
                            </td>
                            <td>10 Déc 2024</td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('examiner.evaluation.details', ['id' => 1]) }}" class="btn-action btn-evaluate" title="Évaluer">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <a href="{{ route('examiner.candidate.profile', ['id' => 1]) }}" class="btn-action btn-view" title="Voir profil">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="#" class="btn-action btn-download" title="Télécharger dossier">
                                        <i class="fas fa-download"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>

                        <!-- Row 2 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="select-row">
                            </td>
                            <td>
                                <div class="candidate-cell">
                                    <div class="candidate-avatar">
                                        <i class="fas fa-user-graduate"></i>
                                    </div>
                                    <div class="candidate-info">
                                        <strong>Dr. KOFFI Mensah</strong>
                                        <span>koffi.mensah@example.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <strong>Enseignant Informatique</strong>
                                <span class="text-muted">REF: INSTI-2025-INF-001</span>
                            </td>
                            <td>Informatique</td>
                            <td>
                                <span class="score-badge score-medium">72/100</span>
                            </td>
                            <td>
                                <span class="status-badge status-in-progress">En cours</span>
                            </td>
                            <td>
                                <span class="priority-badge priority-high">
                                    <i class="fas fa-clock"></i> Haute
                                </span>
                            </td>
                            <td>08 Déc 2024</td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('examiner.evaluation.details', ['id' => 2]) }}" class="btn-action btn-evaluate" title="Continuer">
                                        <i class="fas fa-play-circle"></i>
                                    </a>
                                    <a href="{{ route('examiner.candidate.profile', ['id' => 2]) }}" class="btn-action btn-view" title="Voir profil">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="#" class="btn-action btn-download" title="Télécharger dossier">
                                        <i class="fas fa-download"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>

                        <!-- Row 3 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="select-row">
                            </td>
                            <td>
                                <div class="candidate-cell">
                                    <div class="candidate-avatar">
                                        <i class="fas fa-user-graduate"></i>
                                    </div>
                                    <div class="candidate-info">
                                        <strong>Dr. AMOUSSOU Kévin</strong>
                                        <span>amoussou.kevin@example.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <strong>Enseignant Génie Mécanique</strong>
                                <span class="text-muted">REF: INSTI-2025-GM-001</span>
                            </td>
                            <td>Génie Mécanique</td>
                            <td>
                                <span class="score-badge score-low">65/100</span>
                            </td>
                            <td>
                                <span class="status-badge status-pending">En attente</span>
                            </td>
                            <td>
                                <span class="priority-badge priority-normal">
                                    <i class="fas fa-clock"></i> Normale
                                </span>
                            </td>
                            <td>05 Déc 2024</td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('examiner.evaluation.details', ['id' => 3]) }}" class="btn-action btn-evaluate" title="Évaluer">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <a href="{{ route('examiner.candidate.profile', ['id' => 3]) }}" class="btn-action btn-view" title="Voir profil">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="#" class="btn-action btn-download" title="Télécharger dossier">
                                        <i class="fas fa-download"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>

                        <!-- Row 4 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="select-row">
                            </td>
                            <td>
                                <div class="candidate-cell">
                                    <div class="candidate-avatar">
                                        <i class="fas fa-user-graduate"></i>
                                    </div>
                                    <div class="candidate-info">
                                        <strong>Dr. DOSSOU Akissi</strong>
                                        <span>dossou.akissi@example.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <strong>Enseignant Mathématiques</strong>
                                <span class="text-muted">REF: INSTI-2025-MATH-001</span>
                            </td>
                            <td>Science Fondamentale</td>
                            <td>
                                <span class="score-badge score-high">88/100</span>
                            </td>
                            <td>
                                <span class="status-badge status-completed">Terminée</span>
                            </td>
                            <td>
                                <span class="priority-badge priority-high">
                                    <i class="fas fa-clock"></i> Haute
                                </span>
                            </td>
                            <td>01 Déc 2024</td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('examiner.evaluation.details', ['id' => 4]) }}" class="btn-action btn-review" title="Revoir">
                                        <i class="fas fa-redo"></i>
                                    </a>
                                    <a href="{{ route('examiner.candidate.profile', ['id' => 4]) }}" class="btn-action btn-view" title="Voir profil">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="#" class="btn-action btn-print" title="Imprimer rapport">
                                        <i class="fas fa-print"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- PAGINATION -->
            <div class="pagination">
                <div class="pagination-info">
                    Affichage <strong>1-4</strong> sur <strong>12</strong> candidatures
                </div>
                <div class="pagination-controls">
                    <button class="pagination-btn disabled">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn">2</button>
                    <button class="pagination-btn">3</button>
                    <span class="pagination-dots">...</span>
                    <button class="pagination-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- QUICK STATS -->
    <section class="quick-stats">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1);">
                        <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>5</h3>
                        <p>Évaluations urgentes</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1);">
                        <i class="fas fa-clock" style="color: #f59e0b;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>3.2 jours</h3>
                        <p>Délai moyen</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1);">
                        <i class="fas fa-check-circle" style="color: #10b981;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>74%</h3>
                        <p>Taux de complétion</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(59, 130, 246, 0.1);">
                        <i class="fas fa-chart-line" style="color: #3b82f6;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>28</h3>
                        <p>Évaluations ce mois</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('styles')
<style>
    .evaluations-table-container {
        overflow-x: auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 30px;
    }

    .evaluations-table {
        width: 100%;
        border-collapse: collapse;
    }

    .evaluations-table th {
        background: #f8fafc;
        padding: 16px;
        text-align: left;
        font-weight: 600;
        color: #475569;
        border-bottom: 2px solid #e2e8f0;
    }

    .evaluations-table td {
        padding: 16px;
        border-bottom: 1px solid #e2e8f0;
        vertical-align: middle;
    }

    .evaluations-table tbody tr:hover {
        background: #f8fafc;
    }

    .candidate-cell {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .candidate-avatar {
        width: 40px;
        height: 40px;
        background: #e0f2fe;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0a3f8f;
    }

    .candidate-info {
        display: flex;
        flex-direction: column;
    }

    .candidate-info strong {
        font-weight: 600;
        color: #1e293b;
    }

    .candidate-info span {
        font-size: 12px;
        color: #64748b;
    }

    .score-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
    }

    .score-high { background: #d1fae5; color: #065f46; }
    .score-medium { background: #fef3c7; color: #92400e; }
    .score-low { background: #fee2e2; color: #991b1b; }

    .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
    }

    .status-pending { background: #fef3c7; color: #92400e; }
    .status-in-progress { background: #dbeafe; color: #1e40af; }
    .status-completed { background: #d1fae5; color: #065f46; }

    .priority-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .priority-urgent { background: #fee2e2; color: #991b1b; }
    .priority-high { background: #fef3c7; color: #92400e; }
    .priority-normal { background: #e0f2fe; color: #0a3f8f; }

    .action-buttons {
        display: flex;
        gap: 8px;
    }

    .btn-action {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: all 0.3s;
    }

    .btn-evaluate { background: #0a3f8f; color: white; }
    .btn-view { background: #f1f5f9; color: #475569; }
    .btn-download { background: #f1f5f9; color: #475569; }
    .btn-review { background: #10b981; color: white; }
    .btn-print { background: #f1f5f9; color: #475569; }

    .btn-action:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .text-muted {
        color: #64748b;
        font-size: 12px;
        display: block;
    }

    .select-row {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }

    #selectAll {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
</style>
@endpush

@push('scripts')
<script>
    // Select all functionality
    const selectAll = document.getElementById('selectAll');
    const selectRows = document.querySelectorAll('.select-row');

    if (selectAll) {
        selectAll.addEventListener('change', function() {
            selectRows.forEach(row => {
                row.checked = this.checked;
            });
        });
    }

    // Filter functionality
    const filterStatus = document.getElementById('filterStatus');
    const filterDepartment = document.getElementById('filterDepartment');
    const filterPriority = document.getElementById('filterPriority');
    const filterDate = document.getElementById('filterDate');
    const applyFilterBtn = document.querySelector('.btn-apply-filter');
    const resetFilterBtn = document.querySelector('.btn-reset-filter');
    const tableRows = document.querySelectorAll('.evaluations-table tbody tr');

    function applyFilters() {
        const status = filterStatus.value;
        const department = filterDepartment.value;
        const priority = filterPriority.value;
        const date = filterDate.value;

        tableRows.forEach(row => {
            const rowStatus = row.querySelector('.status-badge').classList[1].replace('status-', '');
            const rowDepartment = row.cells[3].textContent.toLowerCase().replace('génie ', '').replace(' ', '_');
            const rowPriority = row.querySelector('.priority-badge').classList[1].replace('priority-', '');
            const rowDate = new Date(row.cells[7].textContent);
            const today = new Date();

            let show = true;

            // Status filter
            if (status !== 'all' && status !== rowStatus) {
                show = false;
            }

            // Department filter
            if (department !== 'all' && department !== rowDepartment) {
                show = false;
            }

            // Priority filter
            if (priority !== 'all' && priority !== rowPriority) {
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
                }
            }

            row.style.display = show ? '' : 'none';
        });
    }

    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilters);
    }

    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            filterStatus.value = 'all';
            filterDepartment.value = 'all';
            filterPriority.value = 'all';
            filterDate.value = 'all';
            tableRows.forEach(row => row.style.display = '');
        });
    }

    // Export functionality
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Export des données en cours...');
            // In real app, this would trigger CSV/Excel export
        });
    }

    // Bulk actions
    const bulkBtn = document.querySelector('.btn-bulk');
    if (bulkBtn) {
        bulkBtn.addEventListener('click', function() {
            const selectedRows = Array.from(selectRows).filter(row => row.checked);
            
            if (selectedRows.length === 0) {
                alert('Veuillez sélectionner au moins une candidature.');
                return;
            }

            const action = prompt('Action groupée :\n1. Marquer comme terminé\n2. Changer de priorité\n3. Assigner à un autre examinateur\n\nEntrez le numéro de l\'action :');
            
            switch(action) {
                case '1':
                    alert(`${selectedRows.length} candidature(s) marquée(s) comme terminée(s)`);
                    break;
                case '2':
                    const priority = prompt('Nouvelle priorité :\n1. Urgent\n2. Haute\n3. Normale');
                    alert(`Priorité changée pour ${selectedRows.length} candidature(s)`);
                    break;
                case '3':
                    alert(`Assignation en cours pour ${selectedRows.length} candidature(s)`);
                    break;
                default:
                    alert('Action annulée');
            }
        });
    }
</script>
@endpush
