@extends('dashboard')

@section('title', 'INSTI - Mes Candidatures')

@section('content')
    <!-- Main Content Structure -->
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Mes Candidatures</h1>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active">
                        <a href="{{ route('dashboard.enseignant') }}">Tableau de Bord</a>
                    </div>
                    <div class="breadcrumb-item">Mes Candidatures</div>
                </div>
            </div>

            <div class="section-body">
                <!-- STATISTICS CARDS -->
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-primary">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>Total</h4>
                                </div>
                                <div class="card-body">#</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-success">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>Acceptées</h4>
                                </div>
                                <div class="card-body">2</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-warning">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>En cours</h4>
                                </div>
                                <div class="card-body">4</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-danger">
                                <i class="fas fa-times-circle"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>Rejetées</h4>
                                </div>
                                <div class="card-body">2</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FILTERS AND ACTIONS -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4>Filtres</h4>
                                <div class="card-header-form">
                                    <form>
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Rechercher une candidature...">
                                            <div class="input-group-btn">
                                                <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="btn-group mb-3" role="group" aria-label="Filtrer par statut">
                                            <button type="button" class="btn btn-outline-primary active">Toutes</button>
                                            <button type="button" class="btn btn-outline-success">Acceptées</button>
                                            <button type="button" class="btn btn-outline-warning">En cours</button>
                                            <button type="button" class="btn btn-outline-danger">Rejetées</button>
                                            <button type="button" class="btn btn-outline-info">Brouillons</button>
                                        </div>
                                    </div>
                                    <div class="col-md-4 text-right">
                                        <a href="#" class="btn btn-primary">
                                            <i class="fas fa-plus mr-1"></i> Nouvelle Candidature
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- APPLICATIONS LIST -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4>Liste des Candidatures</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Poste</th>
                                                <th>Département</th>
                                                <th>Date de candidature</th>
                                                <th>Statut</th>
                                                <th>Score</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- Candidature 1 - Acceptée -->
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <div class="font-weight-bold">Enseignant en Informatique</div>
                                                    <small class="text-muted">Réf: INSTI-2025-INFO-001</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-building mr-1"></i>
                                                        Informatique
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold">15 Nov 2024</div>
                                                    <small class="text-muted">il y a 25 jours</small>
                                                </td>
                                                <td>
                                                    <div class="badge badge-success">
                                                        <i class="fas fa-check-circle mr-1"></i>
                                                        Acceptée
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold text-success">85/100</div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-info btn-sm" data-toggle="tooltip" title="Voir détails">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-success btn-sm" data-toggle="tooltip" title="Télécharger PDF">
                                                            <i class="fas fa-download"></i>
                                                        </a>
                                                        <button class="btn btn-primary btn-sm" data-toggle="tooltip" title="Suivre">
                                                            <i class="fas fa-chart-line"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Candidature 2 - En cours d'examen -->
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <div class="font-weight-bold">Enseignant en Génie Électrique</div>
                                                    <small class="text-muted">Réf: INSTI-2025-GE-002</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-bolt mr-1"></i>
                                                        Génie Électrique
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold">10 Déc 2024</div>
                                                    <small class="text-muted">il y a 5 jours</small>
                                                </td>
                                                <td>
                                                    <div class="badge badge-warning">
                                                        <i class="fas fa-clock mr-1"></i>
                                                        En examen
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold text-warning">72/100</div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Modifier">
                                                            <i class="fas fa-edit"></i>
                                                        </a>
                                                        <button class="btn btn-secondary btn-sm" data-toggle="tooltip" title="Supprimer">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Candidature 3 - En attente de documents -->
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <div class="font-weight-bold">Enseignant en Génie Mécanique</div>
                                                    <small class="text-muted">Réf: INSTI-2025-GM-003</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-cogs mr-1"></i>
                                                        Génie Mécanique
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold">05 Déc 2024</div>
                                                    <small class="text-muted">il y a 10 jours</small>
                                                </td>
                                                <td>
                                                    <div class="badge badge-info">
                                                        <i class="fas fa-file-upload mr-1"></i>
                                                        Documents en attente
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold text-info">En attente</div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-primary btn-sm" data-toggle="tooltip" title="Compléter">
                                                            <i class="fas fa-upload"></i>
                                                        </a>
                                                        <button class="btn btn-danger btn-sm" data-toggle="tooltip" title="Annuler">
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Candidature 4 - Rejetée -->
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <div class="font-weight-bold">Enseignant en Génie Civil</div>
                                                    <small class="text-muted">Réf: INSTI-2025-GC-004</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-hard-hat mr-1"></i>
                                                        Génie Civil
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold">25 Nov 2024</div>
                                                    <small class="text-muted">il y a 15 jours</small>
                                                </td>
                                                <td>
                                                    <div class="badge badge-danger">
                                                        <i class="fas fa-times-circle mr-1"></i>
                                                        Rejetée
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold text-danger">58/100</div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-secondary btn-sm" data-toggle="tooltip" title="Voir feedback">
                                                            <i class="fas fa-comment"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-primary btn-sm" data-toggle="tooltip" title="Repostuler">
                                                            <i class="fas fa-redo"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Candidature 5 - Pré-sélectionnée -->
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <div class="font-weight-bold">Enseignant en Mathématiques</div>
                                                    <small class="text-muted">Réf: INSTI-2025-MATH-005</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-calculator mr-1"></i>
                                                        Mathématiques
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold">01 Déc 2024</div>
                                                    <small class="text-muted">il y a 14 jours</small>
                                                </td>
                                                <td>
                                                    <div class="badge badge-primary">
                                                        <i class="fas fa-star mr-1"></i>
                                                        Pré-sélectionnée
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="font-weight-bold text-primary">79/100</div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-success btn-sm" data-toggle="tooltip" title="Entretien">
                                                            <i class="fas fa-calendar-check"></i>
                                                        </a>
                                                        <button class="btn btn-primary btn-sm" data-toggle="tooltip" title="Préparer">
                                                            <i class="fas fa-user-check"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer text-right">
                                <nav class="d-inline-block">
                                    <ul class="pagination mb-0">
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#" tabindex="-1">
                                                <i class="fas fa-chevron-left"></i>
                                            </a>
                                        </li>
                                        <li class="page-item active">
                                            <a class="page-link" href="#">1 <span class="sr-only">(current)</span></a>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">2</a>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">3</a>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">
                                                <i class="fas fa-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- STATUS LEGEND -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4>Légende des Statuts</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-success mr-3">
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>Acceptée</h6>
                                                <p class="text-muted">Candidature approuvée</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-warning mr-3">
                                                <i class="fas fa-clock"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>En examen</h6>
                                                <p class="text-muted">En cours d'évaluation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-info mr-3">
                                                <i class="fas fa-file-upload"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>Documents en attente</h6>
                                                <p class="text-muted">Pièces manquantes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-danger mr-3">
                                                <i class="fas fa-times-circle"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>Rejetée</h6>
                                                <p class="text-muted">Candidature refusée</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-primary mr-3">
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>Pré-sélectionnée</h6>
                                                <p class="text-muted">Retenue pour entretien</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-secondary mr-3">
                                                <i class="fas fa-save"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>Brouillon</h6>
                                                <p class="text-muted">Enregistrée non soumise</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-dark mr-3">
                                                <i class="fas fa-pause-circle"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>En attente</h6>
                                                <p class="text-muted">En attente de traitement</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="media">
                                            <div class="media-icon bg-orange mr-3">
                                                <i class="fas fa-user-check"></i>
                                            </div>
                                            <div class="media-body">
                                                <h6>Entretien programmé</h6>
                                                <p class="text-muted">Entretien planifié</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@push('styles')
<style>
    .media-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
    }
    
    .bg-orange {
        background-color: #fd7e14 !important;
    }
    
    .badge-light {
        background-color: #f8f9fa;
        color: #495057;
        border: 1px solid #dee2e6;
    }
    
    .badge-success {
        background-color: #28a745 !important;
    }
    
    .badge-warning {
        background-color: #ffc107 !important;
        color: #212529;
    }
    
    .badge-danger {
        background-color: #dc3545 !important;
    }
    
    .badge-info {
        background-color: #17a2b8 !important;
    }
    
    .badge-primary {
        background-color: #007bff !important;
    }
    
    .badge-secondary {
        background-color: #6c757d !important;
    }
    
    .badge-dark {
        background-color: #343a40 !important;
    }
    
    .table tbody tr:hover {
        background-color: #f8f9fa;
        cursor: pointer;
    }
    
    .btn-group .btn {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
    }
    
    .section-header-breadcrumb {
        background: none;
        padding: 0;
    }
    
    .breadcrumb-item a {
        color: #007bff;
        text-decoration: none;
    }
    
    .breadcrumb-item.active {
        color: #6c757d;
    }
</style>
@endpush

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.btn-group .btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-primary');
                });
                
                // Add active class to clicked button
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary', 'active');
                
                // Get filter status
                const status = this.textContent.trim();
                filterApplications(status);
            });
        });
        
        // Row click event
        const tableRows = document.querySelectorAll('table tbody tr');
        
        tableRows.forEach(row => {
            row.addEventListener('click', function(e) {
                // Don't trigger if clicking on buttons
                if (!e.target.closest('a, button')) {
                    const applicationId = this.querySelector('td:first-child').textContent;
                    window.location.href = `/teacher/applications/${applicationId}`;
                }
            });
        });
        
        // Tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Filter applications function
        function filterApplications(status) {
            const rows = document.querySelectorAll('table tbody tr');
            let visibleCount = 0;
            
            rows.forEach(row => {
                if (status === 'Toutes') {
                    row.style.display = '';
                    visibleCount++;
                    return;
                }
                
                const statusBadge = row.querySelector('td:nth-child(5) .badge');
                const badgeText = statusBadge.textContent.trim();
                
                if (status === 'Acceptées' && badgeText.includes('Acceptée')) {
                    row.style.display = '';
                    visibleCount++;
                } else if (status === 'En cours' && (badgeText.includes('En examen') || badgeText.includes('Pré-sélectionnée') || badgeText.includes('En attente'))) {
                    row.style.display = '';
                    visibleCount++;
                } else if (status === 'Rejetées' && badgeText.includes('Rejetée')) {
                    row.style.display = '';
                    visibleCount++;
                } else if (status === 'Brouillons' && badgeText.includes('Brouillon')) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Show message if no results
            const tableBody = document.querySelector('table tbody');
            const noResultsRow = tableBody.querySelector('.no-results');
            
            if (visibleCount === 0) {
                if (!noResultsRow) {
                    const row = document.createElement('tr');
                    row.className = 'no-results';
                    row.innerHTML = `
                        <td colspan="7" class="text-center py-5">
                            <div class="text-muted">
                                <i class="fas fa-search fa-3x mb-3"></i>
                                <h5>Aucune candidature trouvée</h5>
                                <p>Aucune candidature ne correspond au filtre "${status}"</p>
                            </div>
                        </td>
                    `;
                    tableBody.appendChild(row);
                }
            } else if (noResultsRow) {
                noResultsRow.remove();
            }
        }
        
        // Search functionality
        const searchInput = document.querySelector('input[placeholder="Rechercher une candidature..."]');
        
        if (searchInput) {
            searchInput.addEventListener('keyup', function() {
                const searchTerm = this.value.toLowerCase();
                const rows = document.querySelectorAll('table tbody tr');
                let visibleCount = 0;
                
                rows.forEach(row => {
                    const rowText = row.textContent.toLowerCase();
                    const isNoResultsRow = row.classList.contains('no-results');
                    
                    if (!isNoResultsRow) {
                        if (rowText.includes(searchTerm)) {
                            row.style.display = '';
                            visibleCount++;
                        } else {
                            row.style.display = 'none';
                        }
                    }
                });
                
                // Update no results message
                const tableBody = document.querySelector('table tbody');
                const noResultsRow = tableBody.querySelector('.no-results');
                
                if (visibleCount === 0 && searchTerm) {
                    if (!noResultsRow) {
                        const row = document.createElement('tr');
                        row.className = 'no-results';
                        row.innerHTML = `
                            <td colspan="7" class="text-center py-5">
                                <div class="text-muted">
                                    <i class="fas fa-search fa-3x mb-3"></i>
                                    <h5>Aucun résultat</h5>
                                    <p>Aucune candidature ne correspond à "${searchTerm}"</p>
                                </div>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    }
                } else if (noResultsRow) {
                    noResultsRow.remove();
                }
            });
        }
    });
</script>
@endpush