<aside class="sidebar">
    <div class="sidebar-header">
        <div class="user-profile">
            <div class="avatar">
                <i class="fas fa-user-graduate"></i>
            </div>
            <div class="user-info">
                <h3>{{ Auth::user()->name ?? 'Dr. ADJOVI Jean' }}</h3>
                <span class="user-role">Candidat enseignant</span>
            </div>
        </div>
    </div>

    <nav class="sidebar-nav">
        <ul>
            <li>
                <a href="{{ route('teacher.dashboard') }}" class="{{ request()->routeIs('teacher.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Tableau de bord</span>
                </a>
            </li>
            <li>
                <a href="{{ route('teacher.offers') }}" class="{{ request()->routeIs('teacher.offers') ? 'active' : '' }}">
                    <i class="fas fa-briefcase"></i>
                    <span>Offres d'emploi</span>
                </a>
            </li>
            <li>
                <a href="{{ route('teacher.applications') }}" class="{{ request()->routeIs('teacher.applications') ? 'active' : '' }}">
                    <i class="fas fa-file-alt"></i>
                    <span>Mes candidatures</span>
                    <span class="badge">3</span>
                </a>
            </li>
            <li>
                <a href="{{ route('teacher.profile') }}" class="{{ request()->routeIs('teacher.profile') ? 'active' : '' }}">
                    <i class="fas fa-user-circle"></i>
                    <span>Mon profil</span>
                    <span class="progress-tag">85%</span>
                </a>
            </li>
            <li>
                <a href="{{ route('teacher.documents') }}">
                    <i class="fas fa-folder"></i>
                    <span>Documents</span>
                </a>
            </li>
            <li>
                <a href="{{ route('teacher.messages') }}">
                    <i class="fas fa-envelope"></i>
                    <span>Messages</span>
                    <span class="badge">2</span>
                </a>
            </li>
            <li>
                <a href="{{ route('teacher.settings') }}">
                    <i class="fas fa-cog"></i>
                    <span>Paramètres</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar-footer">
        <div class="stats-card">
            <h4><i class="fas fa-chart-bar"></i> Statistiques</h4>
            <ul>
                <li>
                    <span>Candidatures actives</span>
                    <strong>3</strong>
                </li>
                <li>
                    <span>Documents uploadés</span>
                    <strong>7</strong>
                </li>
                <li>
                    <span>Membre depuis</span>
                    <strong>Nov 2024</strong>
                </li>
            </ul>
        </div>
    </div>
</aside>
