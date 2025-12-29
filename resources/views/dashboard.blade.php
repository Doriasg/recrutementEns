<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INSTI - Tableau de Bord</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('css/header.css') }}">
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
</head>

<body>
    <!-- HEADER -->
    <div class="top-line"></div>

    <header class="header">
        <div class="header-container">

            <div class="header-top">

                <div class="header-left">
                    <div class="logo-container">
                        <img src="{{ asset('assets/images/logo-insti.png') }}" alt="INSTI" class="logo-inst">
                        <div class="header-title">
                            <h1>INSTI</h1>
                            <span>
                                Institut National Supérieur<br>
                                de Technologie Industrielle de Lokossa
                            </span>
                        </div>
                    </div>
                </div>

                <div class="header-right">
                    <div class="item" id="notificationItem">
                        <i class="fas fa-bell"></i>
                        <span>Notifications</span>
                        <span class="notification-badge" id="notificationBadge">2</span>
                    </div>

                    <div class="item">
                        <i class="fas fa-user"></i>
                        <span>Mon Compte</span>
                    </div>

                    <img src="{{ asset('assets/images/logo-unstim.png') }}" alt="UNSTIM" class="unstim-logo-top">
                </div>

                <!-- MENU HAMBURGER -->
                <div class="menu-toggle" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

            <div class="header-line"></div>

            <!-- MENU DÉROULANT -->
            <div class="header-menu" id="headerMenu">
                <nav>
                    <a href="{{ url('/') }}">ACCUEIL</a>
                    <a href="#">OFFRES</a>
                    <a href="#" class="active">TABLEAU DE BORD</a>
                    <a href="#">PROFIL</a>
                    <a href="#">DOCUMENTS</a>
                    <a href="{{ url('/connexion') }}">DÉCONNEXION</a>
                </nav>
            </div>

        </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="dashboard-container">
        <!-- WELCOME SECTION -->
        <section class="welcome-section">
            <div class="welcome-content">
                <h1>Bienvenue {{ $user->name ?? 'Utilisateur' }}</h1>
                <div class="specialty">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Spécialité : {{ $user->specialty ?? 'Génie Électrique' }}</span>
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
                <div class="stat-number">{{ $stats['active'] ?? 3 }}</div>
                <div class="stat-label">Candidatures actives</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-number">{{ $stats['accepted'] ?? 1 }}</div>
                <div class="stat-label">Candidatures acceptées</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-hourglass-half"></i>
                </div>
                <div class="stat-number">{{ $stats['pending'] ?? 2 }}</div>
                <div class="stat-label">En attente</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="stat-number">{{ $stats['viewed'] ?? 24 }}</div>
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
                    @foreach($applications as $app)
                        <div class="application-card">
                            <div class="application-status {{ $app['status_class'] }}">
                                {{ $app['status'] }}
                            </div>
                            <h3 class="application-title">{{ $app['title'] }}</h3>
                            <div class="application-department">
                                <i class="fas fa-building"></i> Département {{ $app['department'] }}
                            </div>
                            <div class="application-date">
                                <i class="far fa-calendar"></i> Soumise le {{ $app['date'] }}
                            </div>
                        </div>
                    @endforeach
                </div>
            </section>

            <!-- SIDEBAR -->
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
                        @foreach($notifications as $note)
                        <div class="notification-item {{ $note['read'] ? 'read' : 'unread' }}">
                            <div class="notification-icon">
                                <i class="fas {{ $note['icon'] }}"></i>
                            </div>
                            <div class="notification-content">
                                <div class="notification-title">{{ $note['title'] }}</div>
                                <div class="notification-desc">{{ $note['desc'] }}</div>
                                <div class="notification-time">{{ $note['time'] }}</div>
                            </div>
                            <div class="notification-dot"></div>
                        </div>
                        @endforeach
                    </div>
                </section>
            </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer>
        <div class="footer-container">
            <div class="footer-grid">
                <!-- Footer sections identiques, avec asset() pour images si besoin -->
            </div>
            <div class="footer-bottom">
                <div class="copyright">
                    INSTI-UNSTIM © 2024 | Plateforme de Recrutement - Espace Candidat
                </div>
            </div>
        </div>
    </footer>

    <script>
        const menuToggle = document.getElementById("menuToggle");
        const headerMenu = document.getElementById("headerMenu");

        menuToggle.addEventListener("click", () => {
            headerMenu.classList.toggle("active");
        });

        document.querySelectorAll(".header-menu a").forEach(link => {
            link.addEventListener("click", () => {
                headerMenu.classList.remove("active");
            });
        });
    </script>

    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>

</html>
