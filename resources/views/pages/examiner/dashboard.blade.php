@extends('dashboard')

@section('title', 'INSTI - Tableau de Bord Examinateur')

@section('content')
    <!-- Main Content Structure -->
    <div class="main-content">
        <section class="section">
            <div class="section-body">
                
                <!-- WELCOME SECTION -->
                <div class="row">
                    <div class="col-12">
                        <div class="card card-hero">
                            <div class="card-header">
                                <h4>Tableau de Bord Examinateur</h4>
                            </div>
                            <div class="card-body">
                                <div class="hero-content">
                                    <div class="row align-items-center">
                                        <div class="col-md-8">
                                            <h2 class="text-dark">Bienvenue {{ Auth::user()->name ?? 'Examinateur' }}</h2>
                                            <div class="mt-3">
                                                <div class="badge badge-info mr-2">
                                                    <i class="fas fa-user-check mr-1"></i>
                                                    Comité de Sélection - Recrutement Enseignants
                                                </div>
                                                <div class="badge badge-warning">
                                                    <i class="fas fa-clock mr-1"></i>
                                                    12 évaluations en attente
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 text-right">
                                            <div class="avatar avatar-lg bg-primary">
                                                <i class="fas fa-user-tie fa-2x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- STATS SECTION -->
                <div class="row mt-4">
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-primary">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>Évaluations en attente</h4>
                                </div>
                                <div class="card-body">12</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-success">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>Évaluations complétées</h4>
                                </div>
                                <div class="card-body">28</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-info">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>Candidats total</h4>
                                </div>
                                <div class="card-body">156</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="card card-statistic-1">
                            <div class="card-icon bg-warning">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="card-wrap">
                                <div class="card-header">
                                    <h4>% Complétion</h4>
                                </div>
                                <div class="card-body">70%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DASHBOARD GRID -->
                <div class="row mt-4">
                    <!-- PENDING EVALUATIONS -->
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-header">
                                <h4>Évaluations en attente</h4>
                                <div class="card-header-action">
                                    <a href="#" class="btn btn-primary">
                                        Voir toutes <i class="fas fa-arrow-right ml-1"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Candidat</th>
                                                <th>Offre</th>
                                                <th>Département</th>
                                                <th>Score</th>
                                                <th>Priorité</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- Evaluation 1 -->
                                            <tr class="priority-urgent">
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar avatar-sm bg-primary mr-3">
                                                            <i class="fas fa-user-graduate"></i>
                                                        </div>
                                                        <div>
                                                            <div class="font-weight-bold">Dr. ADJOVI Jean</div>
                                                            <div class="text-small text-muted">
                                                                <i class="far fa-calendar mr-1"></i>
                                                                Postulé le 10 Déc 2024
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>Enseignant en Génie Électrique</div>
                                                    <small class="text-muted">INSTI-2025-GE-001</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-graduation-cap mr-1"></i>
                                                        Génie Électrique
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="badge badge-success">85/100</div>
                                                </td>
                                                <td>
                                                    <div class="badge badge-danger">
                                                        <i class="fas fa-exclamation-circle mr-1"></i>
                                                        Urgent
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-primary btn-sm">
                                                            <i class="fas fa-edit"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-secondary btn-sm">
                                                            <i class="fas fa-download"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Evaluation 2 -->
                                            <tr class="priority-high">
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar avatar-sm bg-primary mr-3">
                                                            <i class="fas fa-user-graduate"></i>
                                                        </div>
                                                        <div>
                                                            <div class="font-weight-bold">Dr. KOFFI Mensah</div>
                                                            <div class="text-small text-muted">
                                                                <i class="far fa-calendar mr-1"></i>
                                                                Postulé le 08 Déc 2024
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>Enseignant en Informatique</div>
                                                    <small class="text-muted">INSTI-2025-INFO-002</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-graduation-cap mr-1"></i>
                                                        Informatique
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="badge badge-warning">72/100</div>
                                                </td>
                                                <td>
                                                    <div class="badge badge-warning">
                                                        <i class="fas fa-clock mr-1"></i>
                                                        Haute priorité
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-primary btn-sm">
                                                            <i class="fas fa-edit"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-secondary btn-sm">
                                                            <i class="fas fa-download"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Evaluation 3 -->
                                            <tr class="priority-normal">
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar avatar-sm bg-primary mr-3">
                                                            <i class="fas fa-user-graduate"></i>
                                                        </div>
                                                        <div>
                                                            <div class="font-weight-bold">Dr. AMOUSSOU Kévin</div>
                                                            <div class="text-small text-muted">
                                                                <i class="far fa-calendar mr-1"></i>
                                                                Postulé le 05 Déc 2024
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>Enseignant en Génie Mécanique</div>
                                                    <small class="text-muted">INSTI-2025-GM-003</small>
                                                </td>
                                                <td>
                                                    <span class="badge badge-light">
                                                        <i class="fas fa-graduation-cap mr-1"></i>
                                                        Génie Mécanique
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="badge badge-secondary">65/100</div>
                                                </td>
                                                <td>
                                                    <div class="badge badge-info">
                                                        <i class="fas fa-clock mr-1"></i>
                                                        Normale
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="btn-group" role="group">
                                                        <a href="#" class="btn btn-primary btn-sm">
                                                            <i class="fas fa-edit"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-secondary btn-sm">
                                                            <i class="fas fa-download"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#" class="btn btn-outline-primary btn-lg">
                                    <i class="fas fa-list-check mr-2"></i>
                                    Voir toutes les évaluations
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- SIDEBAR CONTENT -->
                    <div class="col-lg-4">
                        <!-- QUICK ACTIONS -->
                        <div class="card">
                            <div class="card-header">
                                <h4>
                                    <i class="fas fa-bolt mr-2 text-primary"></i>
                                    Actions rapides
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action active">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i class="fas fa-clipboard-check mr-3 text-white"></i>
                                                <span class="text-white">Évaluations</span>
                                            </div>
                                            <i class="fas fa-chevron-right text-white"></i>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i class="fas fa-list-check mr-3 text-primary"></i>
                                                Critères d'évaluation
                                            </div>
                                            <i class="fas fa-chevron-right text-muted"></i>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i class="fas fa-chart-pie mr-3 text-primary"></i>
                                                Rapports
                                            </div>
                                            <i class="fas fa-chevron-right text-muted"></i>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i class="fas fa-cog mr-3 text-primary"></i>
                                                Paramètres
                                            </div>
                                            <i class="fas fa-chevron-right text-muted"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- STATISTICS -->
                        <div class="card">
                            <div class="card-header">
                                <h4>
                                    <i class="fas fa-chart-bar mr-2 text-primary"></i>
                                    Statistiques
                                </h4>
                            </div>
                            <div class="card-body">
                                <!-- CHART -->
                                <div class="mb-4">
                                    <div class="chart-item mb-3">
                                        <div class="d-flex justify-content-between mb-1">
                                            <span>Acceptés</span>
                                            <strong>18%</strong>
                                        </div>
                                        <div class="progress" data-height="6">
                                            <div class="progress-bar bg-success" data-width="18%"></div>
                                        </div>
                                    </div>
                                    <div class="chart-item mb-3">
                                        <div class="d-flex justify-content-between mb-1">
                                            <span>En révision</span>
                                            <strong>42%</strong>
                                        </div>
                                        <div class="progress" data-height="6">
                                            <div class="progress-bar bg-warning" data-width="42%"></div>
                                        </div>
                                    </div>
                                    <div class="chart-item mb-3">
                                        <div class="d-flex justify-content-between mb-1">
                                            <span>Rejetés</span>
                                            <strong>25%</strong>
                                        </div>
                                        <div class="progress" data-height="6">
                                            <div class="progress-bar bg-danger" data-width="25%"></div>
                                        </div>
                                    </div>
                                    <div class="chart-item mb-3">
                                        <div class="d-flex justify-content-between mb-1">
                                            <span>En attente</span>
                                            <strong>15%</strong>
                                        </div>
                                        <div class="progress" data-height="6">
                                            <div class="progress-bar bg-secondary" data-width="15%"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- SUMMARY -->
                                <div class="stats-summary">
                                    <div class="summary-item d-flex justify-content-between align-items-center mb-3">
                                        <span class="text-muted">Taux d'acceptation</span>
                                        <strong class="text-success">18%</strong>
                                    </div>
                                    <div class="summary-item d-flex justify-content-between align-items-center mb-3">
                                        <span class="text-muted">Moyenne des scores</span>
                                        <strong class="text-primary">74/100</strong>
                                    </div>
                                    <div class="summary-item d-flex justify-content-between align-items-center mb-3">
                                        <span class="text-muted">Temps moyen d'évaluation</span>
                                        <strong class="text-info">2.3 jours</strong>
                                    </div>
                                    <div class="summary-item d-flex justify-content-between align-items-center">
                                        <span class="text-muted">Évaluations/jour</span>
                                        <strong class="text-warning">3.4</strong>
                                    </div>
                                </div>

                                <!-- QUICK STATS -->
                                <div class="mt-4 pt-3 border-top">
                                    <div class="row text-center">
                                        <div class="col-6">
                                            <div class="mb-2">
                                                <div class="font-weight-bold text-primary">12</div>
                                                <small class="text-muted">En attente</small>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-2">
                                                <div class="font-weight-bold text-success">28</div>
                                                <small class="text-muted">Complétées</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- DEADLINES -->
                        <div class="card">
                            <div class="card-header">
                                <h4>
                                    <i class="fas fa-calendar-alt mr-2 text-primary"></i>
                                    Échéances
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="list-unstyled list-unstyled-border">
                                    <div class="media">
                                        <div class="media-icon bg-danger text-white">
                                            <i class="fas fa-exclamation-circle"></i>
                                        </div>
                                        <div class="media-body">
                                            <h6>Génie Électrique</h6>
                                            <p class="text-small text-muted mb-0">Date limite: 15 Déc 2024</p>
                                            <span class="text-small text-muted">3 évaluations en retard</span>
                                        </div>
                                    </div>
                                    <div class="dropdown-divider"></div>
                                    <div class="media">
                                        <div class="media-icon bg-warning text-white">
                                            <i class="fas fa-clock"></i>
                                        </div>
                                        <div class="media-body">
                                            <h6>Informatique</h6>
                                            <p class="text-small text-muted mb-0">Date limite: 20 Déc 2024</p>
                                            <span class="text-small text-muted">2 jours restants</span>
                                        </div>
                                    </div>
                                    <div class="dropdown-divider"></div>
                                    <div class="media">
                                        <div class="media-icon bg-info text-white">
                                            <i class="fas fa-calendar-check"></i>
                                        </div>
                                        <div class="media-body">
                                            <h6>Génie Civil</h6>
                                            <p class="text-small text-muted mb-0">Date limite: 25 Déc 2024</p>
                                            <span class="text-small text-muted">En bonne voie</span>
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

@push('scripts')
<script>
    // Evaluation interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Table row click
        const tableRows = document.querySelectorAll('table tbody tr');
        
        tableRows.forEach(row => {
            row.addEventListener('click', function(e) {
                if (!e.target.closest('a, button')) {
                    const candidateName = this.querySelector('.font-weight-bold').textContent;
                    const offer = this.querySelector('td:nth-child(2) div').textContent;
                    alert(`Sélection de : ${candidateName}\nOffre : ${offer}`);
                }
            });
        });

        // Priority indicators animation
        const urgentRows = document.querySelectorAll('.priority-urgent');
        
        urgentRows.forEach(row => {
            row.style.animation = 'pulse 2s infinite';
        });

        // Tooltips for buttons
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    });

    // Animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { background-color: rgba(220, 53, 69, 0.1); }
            50% { background-color: rgba(220, 53, 69, 0.2); }
            100% { background-color: rgba(220, 53, 69, 0.1); }
        }
        
        .priority-urgent {
            animation: pulse 2s infinite;
        }
        
        .priority-high {
            background-color: rgba(255, 193, 7, 0.05);
        }
        
        .priority-normal {
            background-color: rgba(108, 117, 125, 0.05);
        }
        
        .card-hero {
            background: linear-gradient(135deg, #0a3f8f 0%, #1a56db 100%);
            color: white;
        }
        
        .card-hero .card-header h4,
        .card-hero .hero-content h2 {
            color: white !important;
        }
        
        .avatar {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            width: 40px;
            height: 40px;
        }
        
        .avatar-lg {
            width: 80px;
            height: 80px;
            font-size: 1.5rem;
        }
        
        .avatar-sm {
            width: 30px;
            height: 30px;
            font-size: 0.8rem;
        }
        
        .stats-summary {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
        }
        
        .chart-item .progress {
            height: 6px !important;
        }
        
        .list-unstyled-border .media {
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        
        .list-unstyled-border .media:last-child {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
        }
        
        .media-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
        }
    `;
    document.head.appendChild(style);
</script>
@endpush