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
                    <span class="notification-badge" id="notificationBadge">5</span>
                </div>
                <div class="item">
                    <i class="fas fa-user-shield"></i>
                    <span>{{ Auth::user()->name ?? 'Administrateur' }}</span>
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
                <a href="{{ route('dashboard.admin') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">TABLEAU DE BORD</a>
                <a href="{{ route('users.admin') }}" class="{{ request()->routeIs('admin.users') ? 'active' : '' }}">UTILISATEURS</a>
                <a href="{{ route('offres.admin') }}" class="{{ request()->routeIs('admin.offers') ? 'active' : '' }}">OFFRES</a>
                <a href="#">CANDIDATURES</a>
                <a href="#">CONFIGURATION</a>
                <a href="#">STATISTIQUES</a>
                <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">DÉCONNEXION</a>
                <form id="logout-form" action="#" method="POST" style="display: none;">
                    @csrf
                </form>
            </nav>
        </div>
    </div>
</header>
