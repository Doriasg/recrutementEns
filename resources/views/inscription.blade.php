<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'INSTI - Inscription')</title>

    <!-- ICONES -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/header.css') }}">
    <link rel="stylesheet" href="{{ asset('css/inscription.css') }}">
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
</head>

<body>

<!-- ===== HEADER ===== -->
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

            <!-- MENU HAMBURGER -->
            <div class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="header-line"></div>

        <div class="header-menu">
            <nav>
                <a href="{{ route('accueil') }}">ACCUEIL</a>
                <a href="{{ route('presentation') }}">PRÉSENTATION</a>
                <a href="{{ route('formations') }}">FORMATIONS</a>
                <a href="{{ route('actualites') }}">ACTUALITÉS</a>
                <a href="{{ route('vie-academique') }}">VIE ACADÉMIQUE</a>
                <a href="{{ route('recherches') }}">RECHERCHES & COOPÉRATIONS</a>
                <a href="{{ route('connexion') }}">CONNEXION</a>
            </nav>
        </div>

    </div>
</header>

<!-- ===== MAIN CONTENT ===== -->
<main class="main-container">

    <div class="register-card">

        <div class="card-header">
            <h2>Créer un compte candidat</h2>
            <p>Inscrivez-vous pour postuler aux offres</p>
        </div>

        <div class="card-content">
            <form method="POST" action="#">
                @csrf

                <div class="form-grid">

                    <div class="form-group">
                        <label>Nom</label>
                        <div class="input-with-icon">
                            <i class="fas fa-user"></i>
                            <input type="text" name="nom" placeholder="Votre nom">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Prénom(s)</label>
                        <div class="input-with-icon">
                            <i class="fas fa-user"></i>
                            <input type="text" name="prenom" placeholder="Votre prénom">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <div class="input-with-icon">
                            <i class="fas fa-envelope"></i>
                            <input type="text" name="email" placeholder="email@example.com">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Téléphone</label>
                        <div class="input-with-icon">
                            <i class="fas fa-phone"></i>
                            <input type="text" name="telephone" placeholder="+229 ********">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Mot de passe</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="password" placeholder="Mot de passe">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Confirmer mot de passe</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="password_confirmation" placeholder="Confirmer mot de passe">
                        </div>
                    </div>

                </div>

                <div class="form-group full-width">
                    <label>Spécialité</label>
                    <select name="specialite">
                        <option selected disabled>Choisissez votre spécialité</option>
                        <option>Informatique</option>
                        <option>Génie Civil</option>
                        <option>Électrotechnique</option>
                        <option>Mécanique</option>
                        <option>Télécommunications</option>
                        <option>Gestion</option>
                    </select>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" name="conditions">
                    <label>
                        J’accepte les <a href="#">conditions générales</a> et la
                        <a href="#">politique de confidentialité</a>
                    </label>
                </div>

                <button class="btn-register">
                    <i class="fas fa-user-plus"></i> Créer mon compte
                </button>

                <div class="login-link">
                    Déjà inscrit ?
                    <a href="{{ route('connexion') }}">Se connecter</a>
                </div>

            </form>
        </div>
    </div>

</main>

<!-- ===== FOOTER ===== -->
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

<!-- ===== JS MENU ===== -->
<script>
    const menuToggle = document.getElementById("menuToggle");
    const headerMenu = document.querySelector(".header-menu");

    menuToggle.addEventListener("click", () => {
        headerMenu.classList.toggle("active");
    });
</script>

</body>
</html>
