<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'INSTI - Institut National Supérieur de Technologie Industrielle')</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- Styles globaux -->
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">


    <!-- Styles spécifiques aux pages -->
    @stack('page-styles')
</head>

<body>
    <!-- Top Line -->
    <div class="top-line"></div>
    <header class="header">
        <div class="header-container">
            <div class="header-top">
                <div class="header-left">
                    <div class="logo-container">
                        <img src="{{ asset('images/logo-insti.png') }}" alt="INSTI" class="logo-inst">
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
                    <img src="{{ asset('images/logo-unstim.png') }}" alt="UNSTIM" class="unstim-logo-top">
                </div>

                <!-- Hamburger Menu -->
                <div class="menu-toggle" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="header-line"></div>

            <div class="header-menu">
                <nav>
                    <a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active' : '' }}">ACCUEIL</a>
                    <a href="#offres">OFFRES</a>
                    <a href="#">CONTACTS</a>
                    @auth
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf

                        <button type="submit" class="btn-logout">DÉCONNEXION</button>

                    </form>
                    @else
                    <a href="{{ route('login') }}" class="{{ request()->routeIs('login') ? 'active' : '' }}">CONNEXION</a>
                    @endauth



                </nav>
            </div>
        </div>
    </header>

    <div>
        @yield('content')


        <!-- Footer -->
        <footer>
            <div class="footer-container">
                <div class="footer-grid">
                    <!-- Nos Ressources -->
                    <div class="footer-section">
                        <h3>Nos Ressources</h3>
                        <ul class="footer-links">
                            <li><a href="#"><i class="fas fa-rocket"></i> Incubateur de startups</a></li>
                            <li><a href="#"><i class="fas fa-cogs"></i> Unité d'application de l'INSTI</a></li>
                            <li><a href="#"><i class="fas fa-laptop"></i> Plateforme E-learning</a></li>
                            <li><a href="#"><i class="fas fa-blog"></i> Blog officiel de l'INSTI</a></li>
                        </ul>
                    </div>

                    <!-- Liens utiles -->
                    <div class="footer-section">
                        <h3>Liens utiles</h3>
                        <ul class="footer-links">
                            <li><a href="#"><i class="fas fa-graduation-cap"></i> Ministère de l'Enseignement Supérieur</a></li>
                            <li><a href="#"><i class="fas fa-cogs"></i> Unité d'application de l'INSTI</a></li>
                        </ul>
                    </div>

                    <!-- Navigations -->
                    <div class="footer-section">
                        <h3>Navigations</h3>
                        <ul class="footer-links">
                            <li><a href="{{ route('home') }}"><i class="fas fa-home"></i> Accueil</a></li>
                            <li><a href="#"><i class="fas fa-book"></i> Formation</a></li>
                            <li><a href="#"><i class="fas fa-users"></i> Vie estudiantine</a></li>
                            <li><a href="#"><i class="fas fa-photo-video"></i> Médiathèque</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="footer-section">
                        <h3>Contact Recrutement</h3>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>recrutement@insti.bj</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>+229 21 91 66 66</span>
                            </div>
                            <div class="moto">
                                Science et technologie au service de l'homme
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="copyright">
                        INSTI-UNSTIM © {{ date('Y') }} | Plateforme de Recrutement des Enseignants
                    </div>
                </div>
            </div>
        </footer>


        <!-- Scripts globaux -->
        <script src="{{ asset('js/home.js') }}"></script>


        <!-- Scripts spécifiques aux pages -->
        @stack('page-scripts')
</body>

</html>