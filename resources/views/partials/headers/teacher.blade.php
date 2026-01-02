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
                    <span>{{ Auth::user()->name ?? 'Mon Compte' }}</span>
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
                <a href="#" class="{{ request()->routeIs('teacher.dashboard') ? 'active' : '' }}">TABLEAU DE BORD</a>
                <a href="#">OFFRES</a>
                <a href="#" class="{{ request()->routeIs('teacher.profile') ? 'active' : '' }}">PROFIL</a>
                <a href="#" class="{{ request()->routeIs('teacher.applications') ? 'active' : '' }}">MES CANDIDATURES</a>
                <a href="#">DOCUMENTS</a>
                <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">DÉCONNEXION</a>
                <form id="logout-form" action="#" method="POST" style="display: none;">
                    @csrf
                </form>
            </nav>
        </div>
    </div>
</header>
