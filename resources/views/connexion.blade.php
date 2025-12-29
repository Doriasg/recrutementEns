<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'INSTI - Connexion')</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/header.css') }}">
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
    <link rel="stylesheet" href="{{ asset('css/connexion.css') }}">
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
                    <span>Accès rapide</span>
                </div>
                <div class="item">
                    <i class="fas fa-eye"></i>
                    <span>Observatoire</span>
                </div>
                <img src="{{ asset('assets/images/logo-unstim.png') }}" alt="UNSTIM" class="unstim-logo-top">
            </div>

            <!-- HAMBURGER -->
            <div class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

        <div class="header-line"></div>

        <!-- MENU -->
        <div class="header-menu" id="headerMenu">
            <nav>
                <a href="{{ route('accueil') }}">ACCUEIL</a>
                <a href="{{ route('presentation') }}">PRÉSENTATION</a>
                <a href="{{ route('formations') }}">FORMATIONS</a>
                <a href="{{ route('actualites') }}">ACTUALITÉS</a>
                <a href="{{ route('vie-academique') }}">VIE ACADÉMIQUE</a>
                <a href="{{ route('recherches') }}">RECHERCHES & COOPÉRATIONS</a>
                <a href="{{ route('inscription') }}">INSCRIPTION</a>
            </nav>
        </div>

    </div>
</header>

<!-- MAIN -->
<main class="main-container">
    <div class="login-card">

        <div class="card-header">
            <h2>Connexion</h2>
            <p>Accédez à votre espace candidat</p>
        </div>

        <div class="card-content">
            <form method="POST" action="#">
                @csrf

                <div class="form-group">
                    <label>Adresse email</label>
                    <div class="input-with-icon">
                        <i class="fas fa-envelope"></i>
                        <input type="text" name="email" placeholder="votre.email@example.com">
                    </div>
                </div>

                <div class="form-group">
                    <label>Mot de passe</label>
                    <div class="input-with-icon">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="password" placeholder="Votre mot de passe">
                        <span class="password-toggle" id="toggleLoginPassword">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                    <div class="forgot-password">
                        <a href="#">Mot de passe oublié ?</a>
                    </div>
                </div>

                <button type="submit" class="btn-login">
                    <i class="fas fa-sign-in-alt"></i> Se connecter
                </button>

                <div class="register-link">
                    Vous n'avez pas de compte ?
                    <a href="{{ route('inscription') }}">Créer un compte</a>
                </div>
            </form>
        </div>

    </div>
</main>

<!-- FOOTER -->
<footer>
    <div class="footer-container">
        <div class="footer-grid">

            <div class="footer-section">
                <h3>Nos Ressources</h3>
                <ul class="footer-links">
                    <li><a href="#"><i class="fas fa-rocket"></i> Incubateur de startups</a></li>
                    <li><a href="#"><i class="fas fa-cogs"></i> Unité d'application de l'INSTI</a></li>
                    <li><a href="#"><i class="fas fa-laptop"></i> Plateforme E-learning</a></li>
                    <li><a href="#"><i class="fas fa-blog"></i> Blog officiel de l'INSTI</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Liens utiles</h3>
                <ul class="footer-links">
                    <li><a href="#"><i class="fas fa-graduation-cap"></i> Ministère de l’Enseignement Supérieur</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Navigations</h3>
                <ul class="footer-links">
                    <li><a href="{{ route('accueil') }}"><i class="fas fa-home"></i> Accueil</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Contact</h3>
                <div class="contact-info">
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
            INSTI-UNSTIM © {{ date('Y') }}
        </div>
    </div>
</footer>

<!-- JS -->
<script>
    const menuToggle = document.getElementById('menuToggle');
    const headerMenu = document.getElementById('headerMenu');

    menuToggle.addEventListener('click', () => {
        headerMenu.classList.toggle('active');
    });

    const togglePassword = document.getElementById('toggleLoginPassword');
    const passwordInput = document.querySelector('input[name="password"]');

    togglePassword.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });
</script>

</body>
</html>
