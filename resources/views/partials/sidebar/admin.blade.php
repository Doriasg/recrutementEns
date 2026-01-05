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
                <a href="{{ route('dashboard.admin') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Tableau de bord</span>
                </a>
            </li>
            <li>
                <a href="{{ route('users.admin') }}" class="{{ request()->routeIs('admin.users') ? 'active' : '' }}">
                    <i class="fas fa-users"></i>
                    <span>Utilisateurs</span>
                    <span class="badge">156</span>
                </a>
            </li>
            <li>
                <a href="{{ route('offres.admin') }}" class="{{ request()->routeIs('admin.offers') ? 'active' : '' }}">
                    <i class="fas fa-briefcase"></i>
                    <span>Offres</span>
                    <span class="badge">24</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-file-alt"></i>
                    <span>Candidatures</span>
                    <span class="badge">356</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-building"></i>
                    <span>Départements</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-cog"></i>
                    <span>Configuration</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-chart-bar"></i>
                    <span>Statistiques</span>
                </a>
            </li>
            <li>
                <a href="#">
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


<!-- End of Sidebar for Admin -->
 <x-app-layout>

        <div class="d-flex" style="min-height: 80vh;">
            <!-- Sidebar -->
            <aside class="bg-dark text-white p-3" style="width: 250px; min-height: 100%;">
                <div class="text-center mb-4">
                    <small>{{ $role }}</small>
                </div>

                <nav class="nav flex-column">
                    @if($role === 'gestionnaire')
                    <ul>
                        <li>
                            <a class="nav-link text-white {{ request()->routeIs('dashboard.admin') ? 'active bg-secondary' : '' }}" href="{{ route('dashboard.admin') }}">
                                <i class="fas fa-tachometer-alt me-2"></i> Tableau de bord
                            </a>
                        </li>
                        <li>
                            <a class="nav-link text-white {{ request()->routeIs('admin.users') ? 'active bg-secondary' : '' }}" href="{{ route('users.admin') }}">
                                <i class="fas fa-users me-2"></i> Utilisateurs <span class="badge bg-warning text-dark ms-auto">156</span>
                            </a>
                        </li>
                        <li>
                            <a class="nav-link text-white {{ request()->routeIs('admin.offres') ? 'active bg-secondary' : '' }}" href="{{ route('offres.admin') }}">
                                <i class="fas fa-briefcase me-2"></i> Offres <span class="badge bg-warning text-dark ms-auto">24</span>
                            </a>
                        </li>
                        <li>
                            <a class="nav-link text-white" href="#">
                        </li>
                        <li>
                            <a class="nav-link text-white" href="#"><i class="fas fa-building me-2"></i> Départements</a>

                        </li>
                        <a class="nav-link text-white" href="#"><i class="fas fa-cog me-2"></i> Configuration</a>
                        <a class="nav-link text-white" href="#"><i class="fas fa-chart-bar me-2"></i> Statistiques</a>
                        <a class="nav-link text-white" href="#"><i class="fas fa-history me-2"></i> Journaux</a>

                    </ul>

                    @elseif($role === 'enseignant'):
                    <ul>
                        <ul>
                            <li>
                                <a href="{{ route('teacher.dashboard') }}" class="">
                                    <i class="fas fa-tachometer-alt"></i>
                                    <span>Tableau de bord</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('candidater') }}" class="{{ request()->routeIs('candidater') ? 'active' : '' }}">
                                    <i class="fas fa-briefcase"></i>
                                    <span>Candidater</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="{{ request()->routeIs('teacher.applications') ? 'active' : '' }}">
                                    <i class="fas fa-file-alt"></i>
                                    <span>Mes candidatures</span>
                                    <span class="badge">3</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('profil') }}" class="{{ request()->routeIs('teacher.profile') ? 'active' : '' }}">
                                    <i class="fas fa-user-circle"></i>
                                    <span>Mon profil</span>
                                    <span class="progress-tag">85%</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fas fa-folder"></i>
                                    <span>Documents</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fas fa-envelope"></i>
                                    <span>Messages</span>
                                    <span class="badge">2</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fas fa-cog"></i>
                                    <span>Paramètres</span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                    @elseif($role === 'evaluateur'):
                    <ul>
                        <li>
                            <a href="{{ route('dashboard.examinateur') }}" class="{{ request()->routeIs('examiner.dashboard') ? 'active' : '' }}">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Tableau de bord</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('evaluations.examinateur') }}" class="{{ request()->routeIs('examiner.evaluations') ? 'active' : '' }}">
                                <i class="fas fa-clipboard-check"></i>
                                <span>Évaluations</span>
                                <span class="badge">12</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-users"></i>
                                <span>Candidats</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-briefcase"></i>
                                <span>Offres</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-list-check"></i>
                                <span>Critères</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-chart-pie"></i>
                                <span>Rapports</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-cog"></i>
                                <span>Paramètres</span>
                            </a>
                        </li>
                    </ul>
                    @elseif($role === 'administrateur'):
                    <ul>
                        <li>
                            <a href="{{ route('dashboard.admin') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Tableau de bord</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('users.admin') }}" class="{{ request()->routeIs('admin.users') ? 'active' : '' }}">
                                <i class="fas fa-users"></i>
                                <span>Utilisateurs</span>
                                <span class="badge">156</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('offres.admin') }}" class="{{ request()->routeIs('admin.offers') ? 'active' : '' }}">
                                <i class="fas fa-briefcase"></i>
                                <span>Offres</span>
                                <span class="badge">24</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-file-alt"></i>
                                <span>Candidatures</span>
                                <span class="badge">356</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-building"></i>
                                <span>Départements</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-cog"></i>
                                <span>Configuration</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-chart-bar"></i>
                                <span>Statistiques</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-history"></i>
                                <span>Journaux</span>
                            </a>
                        </li>
                    </ul>
                    @endif


                </nav>

            </aside>

            <!-- Main Content -->
            <main class="flex-grow-1 p-4 bg-light">
                <div class="container-fluid">
                    <div class="bg-white shadow-sm rounded p-4">
                        {{ __("You're logged in!") }}
                    </div>
                </div>
            </main>
        </div>
    </x-app-layout>

