@extends('layouts.teacher')

@section('title', 'INSTI - Tableau de Bord Enseignant')

@section('content')
    <!-- WELCOME SECTION -->
    <section class="welcome-section">
        <div class="welcome-content">
            <h1>Bienvenue {{ Auth::user()->name ?? 'ADJOVI Jean' }}</h1>
            <div class="specialty">
                <i class="fas fa-graduation-cap"></i>
                <span>Spécialité : Génie Électrique</span>
            </div>
            <div class="status-badge">
                <i class="fas fa-clock"></i> Candidatures soumises - En cours d'examen
            </div>
        </div>
    </section>

    <!-- STATS SECTION -->
    <section class="stats-section">
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-file-alt"></i>
            </div>
            <div class="stat-number">3</div>
            <div class="stat-label">Candidatures actives</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-number">1</div>
            <div class="stat-label">Candidatures acceptées</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-hourglass-half"></i>
            </div>
            <div class="stat-number">2</div>
            <div class="stat-label">En attente</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-eye"></i>
            </div>
            <div class="stat-number">24</div>
            <div class="stat-label">Offres consultées</div>
        </div>
    </section>

    <!-- DASHBOARD GRID -->
    <div class="dashboard-grid">
        <!-- APPLICATIONS SECTION -->
        <section class="applications-section">
            <div class="section-header">
                <h2>Mes candidatures récentes</h2>
                <a href="#" class="view-all">
                    Voir toutes
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <div class="applications-list">
                <!-- Application 1 -->
                <div class="application-card">
                    <div class="application-status status-pending">
                        En examen
                    </div>
                    <h3 class="application-title">Enseignant en Génie Électrique</h3>
                    <div class="application-department">
                        <i class="fas fa-building"></i> Département Génie Électrique
                    </div>
                    <div class="application-date">
                        <i class="far fa-calendar"></i> Soumise le 10 Déc 2024
                    </div>
                </div>

                <!-- Application 2 -->
                <div class="application-card">
                    <div class="application-status status-accepted">
                        Acceptée
                    </div>
                    <h3 class="application-title">Enseignant en Informatique</h3>
                    <div class="application-department">
                        <i class="fas fa-building"></i> Département Informatique
                    </div>
                    <div class="application-date">
                        <i class="far fa-calendar"></i> Soumise le 10 Déc 2024
                    </div>
                </div>

                <!-- Application 3 -->
                <div class="application-card">
                    <div class="application-status status-pending">
                        En examen
                    </div>
                    <h3 class="application-title">Enseignant en Génie Mécanique</h3>
                    <div class="application-department">
                        <i class="fas fa-building"></i> Département Génie Mécanique
                    </div>
                    <div class="application-date">
                        <i class="far fa-calendar"></i> Soumise le 10 Déc 2024
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
                    <a href="#" class="action-item">
                        <div class="action-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="action-text">Voir les offres</div>
                        <div class="action-arrow">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </a>

                    <a href="#" class="action-item active">
                        <div class="action-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="action-text">Mon Profil</div>
                        <div class="action-arrow">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </a>

                    <a href="#" class="action-item">
                        <div class="action-icon">
                            <i class="fas fa-folder"></i>
                        </div>
                        <div class="action-text">Mes documents</div>
                        <div class="action-arrow">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </a>
                </div>
            </section>

            <!-- NOTIFICATIONS -->
            <section class="notifications">
                <h3>
                    <i class="fas fa-bell"></i> Notifications
                </h3>

                <div class="notifications-list">
                    <!-- Notification 1 -->
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-bullhorn"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-title">Nouvelle offre disponible</div>
                            <div class="notification-desc">En Génie Électrique</div>
                            <div class="notification-time">Il y a 2 heures</div>
                        </div>
                        <div class="notification-dot"></div>
                    </div>

                    <!-- Notification 2 -->
                    <div class="notification-item read">
                        <div class="notification-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-title">Candidature acceptée</div>
                            <div class="notification-desc">Pour Informatique</div>
                            <div class="notification-time">Il y a 1 jour</div>
                        </div>
                        <div class="notification-dot"></div>
                    </div>

                    <!-- Notification 3 -->
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-title">Document manquant</div>
                            <div class="notification-desc">Diplôme de doctorat</div>
                            <div class="notification-time">Il y a 3 jours</div>
                        </div>
                        <div class="notification-dot"></div>
                    </div>
                </div>

                <a href="#" class="view-all-notifications">
                    Voir toutes les notifications <i class="fas fa-arrow-right"></i>
                </a>
            </section>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    // Notification badge update
    const notificationBadge = document.getElementById('notificationBadge');
    const notificationItems = document.querySelectorAll('.notification-item.unread');

    if (notificationBadge && notificationItems) {
        notificationBadge.textContent = notificationItems.length;
        
        // Mark as read on click
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
                this.classList.add('read');
                const dot = this.querySelector('.notification-dot');
                if (dot) dot.style.display = 'none';
                
                // Update badge count
                const unreadCount = document.querySelectorAll('.notification-item.unread').length;
                notificationBadge.textContent = unreadCount;
                if (unreadCount === 0) {
                    notificationBadge.style.display = 'none';
                }
            });
        });
    }

    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    const headerMenu = document.querySelector('.header-menu');

    if (menuToggle && headerMenu) {
        menuToggle.addEventListener('click', () => {
            headerMenu.classList.toggle('active');
        });
    }
</script>
@endpush
