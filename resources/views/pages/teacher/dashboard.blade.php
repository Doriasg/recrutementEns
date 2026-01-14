@extends('dashboard')

@section('title', 'INSTI - Tableau de Bord Enseignant')

@section('content')
<div class="main-content">
    <section class="section">
        <div class="section-body">
            @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="fas fa-check-circle"></i>
        {{ session('success') }}
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
    </div>
@endif


            <!-- WELCOME SECTION -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Tableau de Bord</h4>
                        </div>
                        <div class="card-body text-center">
                            <h3>Bienvenue {{ Auth::user()?->name }}</h3>
                            <div class="mt-3">
                                <div class="badge badge-light">
                                    <i class="fas fa-graduation-cap mr-2"></i>
                                    Spécialité : Génie Électrique
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- STATS SECTION -->
            <div class="row mt-4">
                <div class="col-12 col-md-3 col-lg-3">
                    <div class="card card-statistic-1">
                        <div class="card-icon bg-primary">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="card-wrap">
                            <div class="card-header"><h4>Candidatures actives</h4></div>
                            <div class="card-body">3</div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-3 col-lg-3">
                    <div class="card card-statistic-1">
                        <div class="card-icon bg-success">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="card-wrap">
                            <div class="card-header"><h4>Candidatures acceptées</h4></div>
                            <div class="card-body">1</div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-3 col-lg-3">
                    <div class="card card-statistic-1">
                        <div class="card-icon bg-warning">
                            <i class="fas fa-hourglass-half"></i>
                        </div>
                        <div class="card-wrap">
                            <div class="card-header"><h4>En attente</h4></div>
                            <div class="card-body">2</div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-3 col-lg-3">
                    <div class="card card-statistic-1">
                        <div class="card-icon bg-info">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="card-wrap">
                            <div class="card-header"><h4>Offres consultées</h4></div>
                            <div class="card-body">24</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MES CANDIDATURES (Statique) -->
            <div class="row mt-4">
                <div class="col-12 col-md-8 col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h4>Mes candidatures récentes</h4>
                            <div class="card-header-action">
                                <a href="#" class="btn btn-primary">
                                    Voir toutes <i class="fas fa-arrow-right ml-1"></i>
                                </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="list-unstyled list-unstyled-border">
                                <div class="media">
                                    <div class="media-icon bg-success text-white"><i class="far fa-file-alt"></i></div>
                                    <div class="media-body">
                                        <h6>Enseignant en Génie Électrique</h6>
                                        <div class="text-small text-muted">
                                            <i class="fas fa-building mr-1"></i> Département Génie Électrique
                                            <div class="bullet"></div>
                                            <i class="far fa-calendar mr-1"></i> Soumise le 10 Déc 2024
                                        </div>
                                        <div class="mt-2">
                                            <div class="badge badge-success">Acceptée</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-divider"></div>
                                <div class="media">
                                    <div class="media-icon bg-warning text-white"><i class="far fa-file-alt"></i></div>
                                    <div class="media-body">
                                        <h6>Enseignant en Informatique</h6>
                                        <div class="text-small text-muted">
                                            <i class="fas fa-building mr-1"></i> Département Informatique
                                            <div class="bullet"></div>
                                            <i class="far fa-calendar mr-1"></i> Soumise le 10 Déc 2024
                                        </div>
                                        <div class="mt-2">
                                            <div class="badge badge-warning">En examen</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-divider"></div>
                                <div class="media">
                                    <div class="media-icon bg-warning text-white"><i class="far fa-file-alt"></i></div>
                                    <div class="media-body">
                                        <h6>Enseignant en Génie Mécanique</h6>
                                        <div class="text-small text-muted">
                                            <i class="fas fa-building mr-1"></i> Département Génie Mécanique
                                            <div class="bullet"></div>
                                            <i class="far fa-calendar mr-1"></i> Soumise le 10 Déc 2024
                                        </div>
                                        <div class="mt-2">
                                            <div class="badge badge-warning">En examen</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SIDEBAR ACTIONS & NOTIFICATIONS (Statique) -->
                <div class="col-12 col-md-4 col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h4><i class="fas fa-bolt mr-2"></i> Actions rapides</h4>
                        </div>
                        <div class="card-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action active">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div><i class="fas fa-user mr-3 text-white"></i> Mon Profil</div>
                                        <i class="fas fa-chevron-right text-white"></i>
                                    </div>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div><i class="fas fa-search mr-3 text-primary"></i> Voir les offres</div>
                                        <i class="fas fa-chevron-right text-muted"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h4><i class="fas fa-bell mr-2"></i> Notifications
                                <span class="badge badge-danger ml-2">2</span>
                            </h4>
                        </div>
                        <div class="card-body">
                            <div class="list-unstyled list-unstyled-border">
                                <div class="media notification-item unread">
                                    <div class="media-icon bg-warning text-white"><i class="fas fa-bullhorn"></i></div>
                                    <div class="media-body">
                                        <h6>Nouvelle offre disponible</h6>
                                        <p class="text-small text-muted mb-0">En Génie Électrique</p>
                                        <span class="text-small text-muted">Il y a 2 heures</span>
                                    </div>
                                </div>
                                <div class="dropdown-divider"></div>
                                <div class="media notification-item read">
                                    <div class="media-icon bg-success text-white"><i class="fas fa-check-circle"></i></div>
                                    <div class="media-body">
                                        <h6>Candidature acceptée</h6>
                                        <p class="text-small text-muted mb-0">Pour Informatique</p>
                                        <span class="text-small text-muted">Il y a 1 jour</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</div>
@endsection
