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
                <a href="#">PRÉSENTATION</a>
                <a href="#">FORMATIONS</a>
                <a href="#">ACTUALITÉS</a>
                <a href="#">VIE ACADÉMIQUE</a>
                <a href="#">RECHERCHES & COOPÉRATIONS</a>
                <a href="#" class="{{ request()->routeIs('login') ? 'active' : '' }}">CONNEXION</a>
            </nav>
        </div>
    </div>
</header>
