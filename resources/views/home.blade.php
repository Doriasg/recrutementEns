<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'INSTI - Recrutement Enseignants')</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
</head>

<body>
<!-- HEADER -->
<div class="top-line"></div>

<header class="header">
    <div class="header-container">

        <!-- ===== HEADER TOP ===== -->
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
                    <span>Accès rapide</span>
                </div>
                <div class="item">
                    <i class="fas fa-eye"></i>
                    <span>Observatoire</span>
                </div>
                <img src="{{ asset('assets/images/logo-unstim.png') }}" alt="UNSTIM" class="unstim-logo-top">
            </div>

            <!-- ===== HAMBURGER ===== -->
            <div class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

        <div class="header-line"></div>

        <!-- ===== MENU ===== -->
        <div class="header-menu" id="headerMenu">
            <nav>
                <a href="#" class="active">ACCUEIL</a>
                <a href="#">PRÉSENTATION</a>
                <a href="#">FORMATIONS</a>
                <a href="#">ACTUALITÉS</a>
                <a href="#">VIE ACADÉMIQUE</a>
                <a href="#">RECHERCHES & COOPÉRATIONS</a>
                <a href="#">CONNEXION</a>
            </nav>
        </div>

    </div>
</header>

<!-- MAIN CONTENT -->
<main>
    <!-- HERO SECTION -->
    <section class="hero-section">
        <div class="hero-content">
            <h1>Recrutement d'Enseignants</h1>
            <p>
                Rejoignez notre équipe pédagogique et contribuez à former la prochaine génération
                d'ingénieurs et de techniciens supérieurs.
            </p>
            <a href="{{ route('inscription') }}" class="cta-button">Postuler maintenant</a>
        </div>
    </section>

    <!-- OFFRES -->
    <section class="offers-section">
        <div class="offers-header">
            <h2>Offres d'emploi actuelles</h2>
            <p>Consultez les postes disponibles et postulez en ligne.</p>
        </div>

        <div class="offers-grid">

            <!-- Offre 1 -->
            <div class="offer-card">
                <div class="offer-badge">Recrutement</div>
                <div class="offer-content">
                    <h3 class="offer-title">Enseignant en Génie Électrique</h3>
                    <div class="offer-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>Département Génie Électrique</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Temps plein</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Lokossa, Bénin</span>
                        </div>
                    </div>
                    <div class="deadline">
                        <i class="fas fa-calendar-alt"></i>
                        Date limite : <span>15 Janvier 2024</span>
                    </div>
                    <div class="offer-footer">
                        <div class="offer-count">2 Postes</div>
                        <a href="{{ route('inscription') }}" class="apply-button">Détails</a>
                    </div>
                </div>
            </div>

            <!-- Offre 2 -->
            <div class="offer-card">
                <div class="offer-badge">Recrutement</div>
                <div class="offer-content">
                    <h3 class="offer-title">Enseignant en Génie Mécanique</h3>
                    <div class="offer-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>Département Génie Mécanique</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Temps plein</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Lokossa, Bénin</span>
                        </div>
                    </div>
                    <div class="deadline">
                        <i class="fas fa-calendar-alt"></i>
                        Date limite : <span>26 Janvier 2024</span>
                    </div>
                    <div class="offer-footer">
                        <div class="offer-count">2 Postes</div>
                        <a href="{{ route('inscription') }}" class="apply-button">Détails</a>
                    </div>
                </div>
            </div>

            <!-- Offre 3 -->
            <div class="offer-card">
                <div class="offer-badge">Recrutement</div>
                <div class="offer-content">
                    <h3 class="offer-title">Enseignant en Informatique et Réseaux</h3>
                    <div class="offer-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>Département Informatique</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Temps plein</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Lokossa, Bénin</span>
                        </div>
                    </div>
                    <div class="deadline">
                        <i class="fas fa-calendar-alt"></i>
                        Date limite : <span>31 Janvier 2024</span>
                    </div>
                    <div class="offer-footer">
                        <div class="offer-count">2 Postes</div>
                        <a href="{{ route('inscription') }}" class="apply-button">Détails</a>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <h2>Prêt à nous rejoindre ?</h2>
        <p>Postulez dès maintenant et devenez membre de notre équipe pédagogique.</p>
        <div class="cta-buttons">
            <a href="{{ route('inscription') }}" class="cta-button-primary">Postuler maintenant</a>
            <a href="{{ route('connexion') }}" class="cta-button-secondary">Accéder à mon compte</a>
        </div>
    </section>
</main>

<!-- FOOTER -->
<footer>
    <div class="footer-container">
        <div class="footer-bottom">
            INSTI-UNSTIM © {{ date('Y') }} | Plateforme de Recrutement des Enseignants
        </div>
    </div>
</footer>

<!-- SCRIPTS -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.getElementById('menuToggle');
        const navMenu = document.getElementById('headerMenu');

        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });
    });
</script>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const heroSection = document.querySelector('.hero-section');
        const images = [
            "{{ asset('assets/images/hero1.jpeg') }}",
            "{{ asset('assets/images/hero2.jpeg') }}",
            "{{ asset('assets/images/hero3.jpg') }}"
        ];

        let currentIndex = 0;

        function changeBackground() {
            heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
            currentIndex = (currentIndex + 1) % images.length;
        }

        changeBackground();
        setInterval(changeBackground, 30000);
    });
</script>

</body>
</html>
