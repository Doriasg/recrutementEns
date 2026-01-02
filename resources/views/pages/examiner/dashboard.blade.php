@extends('layouts.examiner')

@section('title', 'INSTI - Tableau de Bord Examinateur')

@section('content')
    <!-- WELCOME SECTION -->
    <section class="welcome-section">
        <div class="welcome-content">
            <h1>Bienvenue {{ Auth::user()->name ?? 'Examinateur' }}</h1>
            <div class="specialty">
                <i class="fas fa-user-check"></i>
                <span>Comité de Sélection - Recrutement Enseignants</span>
            </div>
            <div class="status-badge">
                <i class="fas fa-clock"></i> 12 évaluations en attente
            </div>
        </div>
    </section>

    <!-- STATS SECTION -->
    <section class="stats-section">
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-clipboard-check"></i>
            </div>
            <div class="stat-number">12</div>
            <div class="stat-label">Évaluations en attente</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-number">28</div>
            <div class="stat-label">Évaluations complétées</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-users"></i>
            </div>
            <div class="stat-number">156</div>
            <div class="stat-label">Candidats total</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-number">70</div>
            <div class="stat-label">% Complétion</div>
        </div>
    </section>

    <!-- DASHBOARD GRID -->
    <div class="dashboard-grid">
        <!-- PENDING EVALUATIONS -->
        <section class="applications-section">
            <div class="section-header">
                <h2>Évaluations en attente</h2>
                <a href="#" class="view-all">
                    Voir toutes
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <div class="evaluations-list">
                <!-- Evaluation 1 -->
                <div class="evaluation-card">
                    <div class="evaluation-header">
                        <div class="candidate-info">
                            <div class="candidate-avatar">
                                <i class="fas fa-user-graduate"></i>
                            </div>
                            <div>
                                <h3 class="candidate-name">Dr. ADJOVI Jean</h3>
                                <div class="candidate-meta">
                                    <span><i class="fas fa-graduation-cap"></i> Génie Électrique</span>
                                    <span><i class="far fa-calendar"></i> Postulé le 10 Déc 2024</span>
                                </div>
                            </div>
                        </div>
                        <div class="evaluation-status status-urgent">
                            <i class="fas fa-exclamation-circle"></i> Urgent
                        </div>
                    </div>
                    <div class="evaluation-details">
                        <div class="detail-item">
                            <span>Offre:</span>
                            <strong>Enseignant en Génie Électrique</strong>
                        </div>
                        <div class="detail-item">
                            <span>Département:</span>
                            <span>Génie Électrique</span>
                        </div>
                        <div class="detail-item">
                            <span>Score préliminaire:</span>
                            <span class="score-high">85/100</span>
                        </div>
                    </div>
                    <div class="evaluation-actions">
                        <a href="#" class="btn-evaluate">
                            <i class="fas fa-edit"></i> Évaluer
                        </a>
                        <a href="#" class="btn-view">
                            <i class="fas fa-eye"></i> Profil
                        </a>
                    </div>
                </div>

                <!-- Evaluation 2 -->
                <div class="evaluation-card">
                    <div class="evaluation-header">
                        <div class="candidate-info">
                            <div class="candidate-avatar">
                                <i class="fas fa-user-graduate"></i>
                            </div>
                            <div>
                                <h3 class="candidate-name">Dr. KOFFI Mensah</h3>
                                <div class="candidate-meta">
                                    <span><i class="fas fa-graduation-cap"></i> Informatique</span>
                                    <span><i class="far fa-calendar"></i> Postulé le 08 Déc 2024</span>
                                </div>
                            </div>
                        </div>
                        <div class="evaluation-status status-high">
                            <i class="fas fa-clock"></i> Haute priorité
                        </div>
                    </div>
                    <div class="evaluation-details">
                        <div class="detail-item">
                            <span>Offre:</span>
                            <strong>Enseignant en Informatique</strong>
                        </div>
                        <div class="detail-item">
                            <span>Département:</span>
                            <span>Informatique</span>
                        </div>
                        <div class="detail-item">
                            <span>Score préliminaire:</span>
                            <span class="score-medium">72/100</span>
                        </div>
                    </div>
                    <div class="evaluation-actions">
                        <a href="#" class="btn-evaluate">
                            <i class="fas fa-edit"></i> Évaluer
                        </a>
                        <a href="#" class="btn-view">
                            <i class="fas fa-eye"></i> Profil
                        </a>
                    </div>
                </div>

                <!-- Evaluation 3 -->
                <div class="evaluation-card">
                    <div class="evaluation-header">
                        <div class="candidate-info">
                            <div class="candidate-avatar">
                                <i class="fas fa-user-graduate"></i>
                            </div>
                            <div>
                                <h3 class="candidate-name">Dr. AMOUSSOU Kévin</h3>
                                <div class="candidate-meta">
                                    <span><i class="fas fa-graduation-cap"></i> Génie Mécanique</span>
                                    <span><i class="far fa-calendar"></i> Postulé le 05 Déc 2024</span>
                                </div>
                            </div>
                        </div>
                        <div class="evaluation-status status-normal">
                            <i class="fas fa-clock"></i> Normale
                        </div>
                    </div>
                    <div class="evaluation-details">
                        <div class="detail-item">
                            <span>Offre:</span>
                            <strong>Enseignant en Génie Mécanique</strong>
                        </div>
                        <div class="detail-item">
                            <span>Département:</span>
                            <span>Génie Mécanique</span>
                        </div>
                        <div class="detail-item">
                            <span>Score préliminaire:</span>
                            <span class="score-low">65/100</span>
                        </div>
                    </div>
                    <div class="evaluation-actions">
                        <a href="#" class="btn-evaluate">
                            <i class="fas fa-edit"></i> Évaluer
                        </a>
                        <a href="#" class="btn-view">
                            <i class="fas fa-eye"></i> Profil
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- SIDEBAR CONTENT -->
        <div class="dashboard-sidebar">
            <!-- QUICK ACTIONS -->
            <section class="quick-actions">
                <h3>
                    <i class="fas fa-bolt"></i> Actions rapides
                </h3>

                <div class="actions-list">
                    <a href="#" class="action-item active">
                        <div class="action-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div class="action-text">Évaluations</div>
                        <div class="action-arrow">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </a>

                    <a href="#" class="action-item">
                        <div class="action-icon">
                            <i class="fas fa-list-check"></i>
                        </div>
                        <div class="action-text">Critères d'évaluation</div>
                        <div class="action-arrow">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </a>

                    <a href="#" class="action-item">
                        <div class="action-icon">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <div class="action-text">Rapports</div>
                        <div class="action-arrow">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </a>
                </div>
            </section>

            <!-- STATISTICS -->
            <section class="statistics-widget">
                <h3>
                    <i class="fas fa-chart-bar"></i> Statistiques
                </h3>

                <div class="stats-chart">
                    <div class="chart-item">
                        <div class="chart-label">
                            <span>Acceptés</span>
                            <strong>18%</strong>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="width: 18%; background: #10b981;"></div>
                        </div>
                    </div>
                    <div class="chart-item">
                        <div class="chart-label">
                            <span>En révision</span>
                            <strong>42%</strong>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="width: 42%; background: #f59e0b;"></div>
                        </div>
                    </div>
                    <div class="chart-item">
                        <div class="chart-label">
                            <span>Rejetés</span>
                            <strong>25%</strong>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="width: 25%; background: #ef4444;"></div>
                        </div>
                    </div>
                    <div class="chart-item">
                        <div class="chart-label">
                            <span>En attente</span>
                            <strong>15%</strong>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="width: 15%; background: #6b7280;"></div>
                        </div>
                    </div>
                </div>

                <div class="stats-summary">
                    <div class="summary-item">
                        <span>Taux d'acceptation</span>
                        <strong>18%</strong>
                    </div>
                    <div class="summary-item">
                        <span>Moyenne des scores</span>
                        <strong>74/100</strong>
                    </div>
                    <div class="summary-item">
                        <span>Temps moyen d'évaluation</span>
                        <strong>2.3 jours</strong>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    // Evaluation card interactions
    const evaluateButtons = document.querySelectorAll('.btn-evaluate');
    
    evaluateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const candidateName = this.closest('.evaluation-card').querySelector('.candidate-name').textContent;
            alert(`Ouverture de l'évaluation pour ${candidateName}`);
            // In real app, this would navigate to evaluation page
            window.location.href = this.href;
        });
    });

    // Priority indicators
    const statusBadges = document.querySelectorAll('.evaluation-status');
    
    statusBadges.forEach(badge => {
        if (badge.classList.contains('status-urgent')) {
            badge.style.animation = 'pulse 2s infinite';
        }
    });

    // Animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
</script>
@endpush
