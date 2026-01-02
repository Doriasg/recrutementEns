@extends('layouts.admin')

@section('title', 'INSTI - Tableau de Bord Administrateur')

@section('content')
    <!-- WELCOME SECTION -->
    <section class="welcome-section">
        <div class="welcome-content">
            <h1>Tableau de Bord Administrateur</h1>
            <div class="specialty">
                <i class="fas fa-user-shield"></i>
                <span>Super Administrateur - Plateforme de Recrutement</span>
            </div>
            <div class="status-badge">
                <i class="fas fa-server"></i> Système actif - Tous les services opérationnels
            </div>
        </div>
    </section>

    <!-- KEY METRICS -->
    <section class="metrics-section">
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-icon" style="background: rgba(37, 99, 235, 0.1);">
                    <i class="fas fa-users" style="color: #2563eb;"></i>
                </div>
                <div class="metric-content">
                    <h3>1,248</h3>
                    <p>Utilisateurs total</p>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i> 12% ce mois
                    </div>
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-icon" style="background: rgba(16, 185, 129, 0.1);">
                    <i class="fas fa-briefcase" style="color: #10b981;"></i>
                </div>
                <div class="metric-content">
                    <h3>24</h3>
                    <p>Offres actives</p>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i> 3 nouvelles
                    </div>
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-icon" style="background: rgba(245, 158, 11, 0.1);">
                    <i class="fas fa-file-alt" style="color: #f59e0b;"></i>
                </div>
                <div class="metric-content">
                    <h3>356</h3>
                    <p>Candidatures total</p>
                    <div class="metric-trend positive">
                        <i class="fas fa-arrow-up"></i> 8% cette semaine
                    </div>
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-icon" style="background: rgba(239, 68, 68, 0.1);">
                    <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                </div>
                <div class="metric-content">
                    <h3>5</h3>
                    <p>Alertes système</p>
                    <div class="metric-trend negative">
                        <i class="fas fa-arrow-up"></i> Nécessite attention
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- DASHBOARD GRID -->
    <div class="dashboard-grid">
        <!-- RECENT ACTIVITY -->
        <section class="activity-section">
            <div class="section-header">
                <h2><i class="fas fa-history"></i> Activité récente</h2>
                <a href="#" class="view-all">
                    Voir tout
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <div class="activity-list">
                <!-- Activity 1 -->
                <div class="activity-item">
                    <div class="activity-icon success">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            <strong>Nouvel utilisateur inscrit</strong>
                            <span class="activity-time">Il y a 5 minutes</span>
                        </div>
                        <p class="activity-desc">
                            Dr. KOUASSI Marc s'est inscrit comme candidat enseignant
                        </p>
                        <div class="activity-meta">
                            <span class="badge badge-light">Inscription</span>
                            <span class="badge badge-info">Nouveau</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 2 -->
                <div class="activity-item">
                    <div class="activity-icon warning">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            <strong>Tentative de connexion suspecte</strong>
                            <span class="activity-time">Il y a 15 minutes</span>
                        </div>
                        <p class="activity-desc">
                            Multiples tentatives de connexion échouées depuis l'IP 192.168.1.100
                        </p>
                        <div class="activity-meta">
                            <span class="badge badge-light">Sécurité</span>
                            <span class="badge badge-danger">Critique</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 3 -->
                <div class="activity-item">
                    <div class="activity-icon info">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            <strong>Nouvelle offre publiée</strong>
                            <span class="activity-time">Il y a 1 heure</span>
                        </div>
                        <p class="activity-desc">
                            Offre "Enseignant en Télécommunications" publiée par l'administrateur système
                        </p>
                        <div class="activity-meta">
                            <span class="badge badge-light">Offre</span>
                            <span class="badge badge-success">Publication</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 4 -->
                <div class="activity-item">
                    <div class="activity-icon success">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            <strong>Candidature acceptée</strong>
                            <span class="activity-time">Il y a 3 heures</span>
                        </div>
                        <p class="activity-desc">
                            Candidature de Dr. ADJOVI Jean acceptée pour le poste d'enseignant en Informatique
                        </p>
                        <div class="activity-meta">
                            <span class="badge badge-light">Candidature</span>
                            <span class="badge badge-success">Acceptée</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 5 -->
                <div class="activity-item">
                    <div class="activity-icon danger">
                        <i class="fas fa-server"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            <strong>Maintenance planifiée</strong>
                            <span class="activity-time">Demain à 02:00</span>
                        </div>
                        <p class="activity-desc">
                            Maintenance système planifiée pour mises à jour de sécurité
                        </p>
                        <div class="activity-meta">
                            <span class="badge badge-light">Système</span>
                            <span class="badge badge-warning">Planifié</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- QUICK STATS -->
        <div class="stats-sidebar">
            <!-- SYSTEM HEALTH -->
            <section class="system-health">
                <h3><i class="fas fa-heartbeat"></i> Santé du système</h3>
                <div class="health-indicators">
                    <div class="indicator">
                        <div class="indicator-label">
                            <span>Serveur Web</span>
                            <strong>100%</strong>
                        </div>
                        <div class="indicator-bar">
                            <div class="bar-fill" style="width: 100%; background: #10b981;"></div>
                        </div>
                    </div>
                    <div class="indicator">
                        <div class="indicator-label">
                            <span>Base de données</span>
                            <strong>92%</strong>
                        </div>
                        <div class="indicator-bar">
                            <div class="bar-fill" style="width: 92%; background: #10b981;"></div>
                        </div>
                    </div>
                    <div class="indicator">
                        <div class="indicator-label">
                            <span>Stockage</span>
                            <strong>78%</strong>
                        </div>
                        <div class="indicator-bar">
                            <div class="bar-fill" style="width: 78%; background: #f59e0b;"></div>
                        </div>
                    </div>
                    <div class="indicator">
                        <div class="indicator-label">
                            <span>Performance</span>
                            <strong>85%</strong>
                        </div>
                        <div class="indicator-bar">
                            <div class="bar-fill" style="width: 85%; background: #10b981;"></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- QUICK ACTIONS -->
            <section class="quick-actions">
                <h3><i class="fas fa-bolt"></i> Actions rapides</h3>
                <div class="actions-grid">
                    <a href="#" class="action-btn">
                        <div class="action-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <span>Ajouter utilisateur</span>
                    </a>
                    <a href="#" class="action-btn">
                        <div class="action-icon">
                            <i class="fas fa-plus-circle"></i>
                        </div>
                        <span>Créer offre</span>
                    </a>
                    <a href="#" class="action-btn">
                        <div class="action-icon">
                            <i class="fas fa-cog"></i>
                        </div>
                        <span>Configuration</span>
                    </a>
                    <a href="#" class="action-btn">
                        <div class="action-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <span>Rapports</span>
                    </a>
                    <a href="#" class="action-btn">
                        <div class="action-icon">
                            <i class="fas fa-save"></i>
                        </div>
                        <span>Sauvegarde</span>
                    </a>
                    <a href="#" class="action-btn">
                        <div class="action-icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <span>Journaux</span>
                    </a>
                </div>
            </section>

            <!-- RECENT USERS -->
            <section class="recent-users">
                <div class="section-header">
                    <h3><i class="fas fa-user-clock"></i> Nouveaux utilisateurs</h3>
                    <a href="#">Voir tout</a>
                </div>
                <div class="users-list">
                    <div class="user-item">
                        <div class="user-avatar">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="user-info">
                            <strong>Dr. KOUASSI Marc</strong>
                            <span>Enseignant candidat</span>
                        </div>
                        <span class="user-time">Aujourd'hui</span>
                    </div>
                    <div class="user-item">
                        <div class="user-avatar">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="user-info">
                            <strong>Prof. DOSSOU Anna</strong>
                            <span>Examinateur</span>
                        </div>
                        <span class="user-time">Hier</span>
                    </div>
                    <div class="user-item">
                        <div class="user-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="user-info">
                            <strong>M. AGBANGLAN</strong>
                            <span>Administrateur</span>
                        </div>
                        <span class="user-time">2 jours</span>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- STATISTICS CHARTS -->
    <section class="charts-section">
        <div class="charts-grid">
            <!-- Chart 1: Candidatures par département -->
            <div class="chart-card">
                <div class="chart-header">
                    <h3><i class="fas fa-chart-pie"></i> Candidatures par département</h3>
                    <select class="chart-filter">
                        <option value="month">Ce mois</option>
                        <option value="week">Cette semaine</option>
                        <option value="year">Cette année</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="applicationsByDepartment"></canvas>
                </div>
            </div>

            <!-- Chart 2: Évolution des candidatures -->
            <div class="chart-card">
                <div class="chart-header">
                    <h3><i class="fas fa-chart-line"></i> Évolution des candidatures</h3>
                    <select class="chart-filter">
                        <option value="30">30 derniers jours</option>
                        <option value="90">3 derniers mois</option>
                        <option value="365">1 an</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="applicationsTrend"></canvas>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('styles')
<style>
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }

    .metric-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .metric-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }

    .metric-content h3 {
        font-size: 32px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 4px;
    }

    .metric-content p {
        color: #64748b;
        font-size: 14px;
        margin-bottom: 8px;
    }

    .metric-trend {
        font-size: 12px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .metric-trend.positive {
        color: #10b981;
    }

    .metric-trend.negative {
        color: #ef4444;
    }

    .activity-list {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .activity-item {
        display: flex;
        gap: 16px;
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
        transition: background 0.3s;
    }

    .activity-item:hover {
        background: #f8fafc;
    }

    .activity-item:last-child {
        border-bottom: none;
    }

    .activity-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
    }

    .activity-icon.success {
        background: #d1fae5;
        color: #10b981;
    }

    .activity-icon.warning {
        background: #fef3c7;
        color: #f59e0b;
    }

    .activity-icon.info {
        background: #dbeafe;
        color: #3b82f6;
    }

    .activity-icon.danger {
        background: #fee2e2;
        color: #ef4444;
    }

    .activity-content {
        flex: 1;
    }

    .activity-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
    }

    .activity-title strong {
        font-weight: 600;
        color: #1e293b;
    }

    .activity-time {
        font-size: 12px;
        color: #94a3b8;
    }

    .activity-desc {
        color: #64748b;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 12px;
    }

    .activity-meta {
        display: flex;
        gap: 8px;
    }

    .badge {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        display: inline-block;
    }

    .badge-light {
        background: #f1f5f9;
        color: #475569;
    }

    .badge-success {
        background: #d1fae5;
        color: #065f46;
    }

    .badge-danger {
        background: #fee2e2;
        color: #991b1b;
    }

    .badge-warning {
        background: #fef3c7;
        color: #92400e;
    }

    .badge-info {
        background: #dbeafe;
        color: #1e40af;
    }

    .stats-sidebar {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .system-health, .quick-actions, .recent-users {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .health-indicators {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .indicator {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .indicator-label {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #475569;
    }

    .indicator-label strong {
        font-weight: 600;
        color: #1e293b;
    }

    .indicator-bar {
        height: 6px;
        background: #e2e8f0;
        border-radius: 3px;
        overflow: hidden;
    }

    .bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 1s ease;
    }

    .actions-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .action-btn {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        text-decoration: none;
        color: #475569;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        transition: all 0.3s;
    }

    .action-btn:hover {
        background: #e2e8f0;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .action-icon {
        width: 40px;
        height: 40px;
        background: #0a3f8f;
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }

    .action-btn span {
        font-size: 12px;
        font-weight: 600;
        text-align: center;
    }

    .users-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .user-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;
    }

    .user-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .user-avatar {
        width: 40px;
        height: 40px;
        background: #e0f2fe;
        color: #0a3f8f;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }

    .user-info {
        flex: 1;
    }

    .user-info strong {
        display: block;
        font-weight: 600;
        color: #1e293b;
        font-size: 14px;
    }

    .user-info span {
        font-size: 12px;
        color: #64748b;
    }

    .user-time {
        font-size: 12px;
        color: #94a3b8;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 24px;
        margin-top: 30px;
    }

    .chart-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .chart-header h3 {
        font-size: 18px;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .chart-filter {
        padding: 8px 16px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 14px;
        color: #475569;
        background: white;
    }

    .chart-container {
        height: 250px;
        position: relative;
    }
</style>
@endpush

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Applications by department chart
        const deptCtx = document.getElementById('applicationsByDepartment');
        if (deptCtx) {
            new Chart(deptCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Génie Électrique', 'Informatique', 'Génie Mécanique', 'Génie Civil', 'Science Fondamentale'],
                    datasets: [{
                        data: [85, 72, 48, 35, 25],
                        backgroundColor: [
                            '#0a3f8f',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    }
                }
            });
        }

        // Applications trend chart
        const trendCtx = document.getElementById('applicationsTrend');
        if (trendCtx) {
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
                    datasets: [{
                        label: 'Candidatures',
                        data: [45, 52, 48, 61, 58, 65, 72, 68, 75, 82, 78, 85],
                        borderColor: '#0a3f8f',
                        backgroundColor: 'rgba(10, 63, 143, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Activity item click
        const activityItems = document.querySelectorAll('.activity-item');
        activityItems.forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.activity-title strong').textContent;
                alert(`Détails de l'activité : ${title}`);
            });
        });

        // Real-time updates simulation
        function simulateRealTimeUpdate() {
            const metrics = document.querySelectorAll('.metric-content h3');
            if (metrics.length >= 3) {
                const applicationsMetric = metrics[2];
                let currentValue = parseInt(applicationsMetric.textContent);
                applicationsMetric.textContent = (currentValue + 1).toString();
                
                // Add animation
                applicationsMetric.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    applicationsMetric.style.transform = 'scale(1)';
                }, 300);
            }
        }

        // Simulate new application every 30 seconds
        setInterval(simulateRealTimeUpdate, 30000);
    });
</script>
@endpush
