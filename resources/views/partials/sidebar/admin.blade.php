<aside class="sidebar">
    <div class="sidebar-header">
        <div class="user-profile">
            <div class="avatar">
                <i class="fas fa-user-shield"></i>
            </div>
            <div class="user-info">
                <h3>{{ Auth::user()->name ?? 'Administrateur' }}</h3>
                <span class="user-role">Super Administrateur</span>
            </div>
        </div>
    </div>

    <nav class="sidebar-nav">
        <ul>
            <li>
                <a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Tableau de bord</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.users') }}" class="{{ request()->routeIs('admin.users') ? 'active' : '' }}">
                    <i class="fas fa-users"></i>
                    <span>Utilisateurs</span>
                    <span class="badge">156</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.offers') }}" class="{{ request()->routeIs('admin.offers') ? 'active' : '' }}">
                    <i class="fas fa-briefcase"></i>
                    <span>Offres</span>
                    <span class="badge">24</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.applications') }}">
                    <i class="fas fa-file-alt"></i>
                    <span>Candidatures</span>
                    <span class="badge">356</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.departments') }}">
                    <i class="fas fa-building"></i>
                    <span>Départements</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.settings') }}">
                    <i class="fas fa-cog"></i>
                    <span>Configuration</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.reports') }}">
                    <i class="fas fa-chart-bar"></i>
                    <span>Statistiques</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.logs') }}">
                    <i class="fas fa-history"></i>
                    <span>Journaux</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar-footer">
        <div class="stats-card">
            <h4><i class="fas fa-server"></i> Système</h4>
            <ul>
                <li>
                    <span>Utilisateurs actifs</span>
                    <strong>42</strong>
                </li>
                <li>
                    <span>Stockage utilisé</span>
                    <strong>78%</strong>
                </li>
                <li>
                    <span>Version</span>
                    <strong>v2.5.1</strong>
                </li>
            </ul>
        </div>
    </div>
</aside>
