<aside class="sidebar">
    <div class="sidebar-header">
        <div class="user-profile">
            <div class="avatar">
                <i class="fas fa-user-check"></i>
            </div>
            <div class="user-info">
                <h3>{{ Auth::user()->name ?? 'Examinateur' }}</h3>
                <span class="user-role">Comité de sélection</span>
            </div>
        </div>
    </div>

    <nav class="sidebar-nav">
        <ul>
            <li>
                <a href="{{ route('examiner.dashboard') }}" class="{{ request()->routeIs('examiner.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Tableau de bord</span>
                </a>
            </li>
            <li>
                <a href="{{ route('examiner.evaluations') }}" class="{{ request()->routeIs('examiner.evaluations') ? 'active' : '' }}">
                    <i class="fas fa-clipboard-check"></i>
                    <span>Évaluations</span>
                    <span class="badge">12</span>
                </a>
            </li>
            <li>
                <a href="{{ route('examiner.candidates') }}">
                    <i class="fas fa-users"></i>
                    <span>Candidats</span>
                </a>
            </li>
            <li>
                <a href="{{ route('examiner.offers') }}">
                    <i class="fas fa-briefcase"></i>
                    <span>Offres</span>
                </a>
            </li>
            <li>
                <a href="{{ route('examiner.criteria') }}">
                    <i class="fas fa-list-check"></i>
                    <span>Critères</span>
                </a>
            </li>
            <li>
                <a href="{{ route('examiner.reports') }}">
                    <i class="fas fa-chart-pie"></i>
                    <span>Rapports</span>
                </a>
            </li>
            <li>
                <a href="{{ route('examiner.settings') }}">
                    <i class="fas fa-cog"></i>
                    <span>Paramètres</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar-footer">
        <div class="stats-card">
            <h4><i class="fas fa-chart-line"></i> Aujourd'hui</h4>
            <ul>
                <li>
                    <span>Évaluations en attente</span>
                    <strong>5</strong>
                </li>
                <li>
                    <span>Évaluées</span>
                    <strong>7</strong>
                </li>
                <li>
                    <span>Taux de complétion</span>
                    <strong>58%</strong>
                </li>
            </ul>
        </div>
    </div>
</aside>
