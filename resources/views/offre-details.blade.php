<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INSTI - Détails de l'Offre</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('css/header.css') }}">
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
    <link rel="stylesheet" href="{{ asset('css/offre-details.css') }}">
</head>

<body>
    <!-- HEADER -->
    <div class="top-line"></div>
    <header class="header">
        <div class="header-container">
            <!-- HEADER TOP -->
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
                    <div class="item">
                        <i class="fas fa-user"></i>
                        <span>Mon Compte</span>
                    </div>
                    <div class="item">
                        <i class="fas fa-briefcase"></i>
                        <span>Mes Candidatures</span>
                    </div>
                    <img src="{{ asset('assets/images/logo-unstim.png') }}" alt="UNSTIM" class="unstim-logo-top">
                </div>

                <!-- BOUTON HAMBURGER -->
                <div class="menu-toggle" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="header-line"></div>

            <!-- MENU NAVIGATION -->
            <div class="header-menu">
                <nav>
                    <a href="{{ url('/') }}">ACCUEIL</a>
                    <a href="#">OFFRES</a>
                    <a href="{{ url('/dashboard') }}">TABLEAU DE BORD</a>
                    <a href="#">PROFIL</a>
                    <a href="{{ url('/connexion') }}">CONNEXION</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="offer-details-container">
        <!-- BACK LINK -->
        <div class="back-link">
            <a href="{{ url('/offres') }}">
                <i class="fas fa-arrow-left"></i> Retour aux offres
            </a>
        </div>

        <!-- OFFER HEADER -->
        <section class="offer-header">
            <div class="offer-title-section">
                <h1 class="offer-title">{{ $offre->title }}</h1>
                <div class="offer-meta">
                    <div class="meta-item">
                        <i class="fas fa-building"></i> Département {{ $offre->department }}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i> {{ $offre->type_emploi }}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i> {{ $offre->location }}
                    </div>
                </div>
                <div class="offer-availability">
                    <i class="fas fa-briefcase"></i> {{ $offre->positions }} Postes disponibles
                </div>
            </div>

            <div class="date-info">
                <div class="publication-date">
                    <div class="date-label">Publié le</div>
                    <div class="date-value">{{ $offre->publication_date->format('d M Y') }}</div>
                </div>
                <div class="deadline-date">
                    <div class="date-label">Date limite de candidature</div>
                    <div class="date-value">{{ $offre->deadline->format('d M Y') }}</div>
                    <div class="deadline-remaining">
                        <i class="fas fa-clock"></i>
                        <span>il reste {{ $offre->deadline->diffInDays(now()) }} jours</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- OFFER CONTENT GRID -->
        <div class="offer-content-grid">
            <!-- MAIN CONTENT -->
            <div class="offer-main-content">
                <!-- DESCRIPTION SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-file-alt"></i> Description du poste
                    </h2>
                    <div class="description-text">
                        {!! nl2br(e($offre->description)) !!}
                    </div>
                </section>

                <!-- MISSIONS SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-tasks"></i> Missions principales
                    </h2>
                    <ul class="missions-list">
                        @foreach($offre->missions as $mission)
                            <li>{{ $mission }}</li>
                        @endforeach
                    </ul>
                </section>

                <!-- PROFILE SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-user-graduate"></i> Profil Recherché
                    </h2>

                    @foreach($offre->profil as $category => $items)
                        <div class="requirements-category">
                            <h4><i class="fas fa-graduation-cap"></i> {{ $category }}</h4>
                            <ul class="requirements-list">
                                @foreach($items as $item)
                                    <li>{{ $item }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endforeach
                </section>

                <!-- DOCUMENTS SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-file-upload"></i> Documents à fournir
                    </h2>
                    <ul class="documents-list">
                        @foreach($offre->documents as $doc)
                            <li>{{ $doc }}</li>
                        @endforeach
                    </ul>
                </section>
            </div>

            <!-- SIDEBAR -->
            <div class="offer-sidebar">
                <!-- STATUS & ACTIONS -->
                <section class="status-actions">
                    <div class="status-badge-large">
                        <i class="fas fa-check-circle"></i> {{ $offre->status }}
                    </div>

                    <div class="actions-buttons">
                        <a href="{{ route('postuler', ['offre' => $offre->id]) }}" class="apply-button" id="applyButton">
                            <i class="fas fa-paper-plane"></i> Postuler maintenant
                        </a>

                        <a href="{{ route('offres.sauvegarder', ['offre' => $offre->id]) }}" class="save-button" id="saveButton">
                            <i class="far fa-bookmark"></i> Sauvegarder l'offre
                        </a>
                    </div>

                    <div class="application-alert" id="applicationAlert"></div>
                </section>

                <!-- OFFER INFO -->
                <section class="offer-info">
                    <h3 class="section-title">
                        <i class="fas fa-info-circle"></i> Informations
                    </h3>

                    <div class="info-item">
                        <span class="info-label">Référence</span>
                        <span class="info-value">{{ $offre->reference }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Type de contrat</span>
                        <span class="info-value">{{ $offre->type_contrat }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Lieu de travail</span>
                        <span class="info-value">{{ $offre->location }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Salaire</span>
                        <span class="info-value">{{ $offre->salary }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Prise de fonction</span>
                        <span class="info-value">{{ $offre->start_date->format('F Y') }}</span>
                    </div>
                </section>

                <!-- CONTACT INFO -->
                <section class="contact-info-sidebar">
                    <h3><i class="fas fa-headset"></i> Contact</h3>
                    <p style="margin-bottom: 20px; opacity: 0.9; font-size: 14px;">
                        Pour toute information concernant cette offre, contactez :
                    </p>

                    <div class="contact-details">
                        <div class="contact-item">
                            <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                            <div class="contact-text">
                                <strong>Email</strong>
                                <span>{{ $offre->contact_email }}</span>
                            </div>
                        </div>

                        <div class="contact-item">
                            <div class="contact-icon"><i class="fas fa-phone"></i></div>
                            <div class="contact-text">
                                <strong>Téléphone</strong>
                                <span>{{ $offre->contact_phone }}</span>
                            </div>
                        </div>

                        <div class="contact-item">
                            <div class="contact-icon"><i class="fas fa-clock"></i></div>
                            <div class="contact-text">
                                <strong>Horaires</strong>
                                <span>{{ $offre->contact_hours }}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer>
        <div class="footer-container">
            <div class="footer-grid">
                <!-- Les sections du footer identiques à ton HTML -->
            </div>
            <div class="footer-bottom">
                <div class="copyright">
                    INSTI-UNSTIM © 2024 | Offre n°{{ $offre->reference }}
                </div>
            </div>
        </div>
    </footer>

    <script>
        const menuToggle = document.getElementById('menuToggle');
        const headerMenu = document.querySelector('.header-menu');

        menuToggle.addEventListener('click', () => {
            headerMenu.classList.toggle('active');
        });
    </script>

    <script src="{{ asset('js/offre-details.js') }}"></script>
</body>

</html>
