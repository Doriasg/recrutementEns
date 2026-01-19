@extends('dashboard')
@section('content')
<div class="main-content">
    <section class="section">
        <div class="section-body">
            <div class="row mt-sm-4">
                <div class="col-12 col-md-12 col-lg-12">
                    <div class="card author-box">
                        <div class="card-body">
                            <div class="author-box-center">
                                @if ($user->photo_url)
                                    <img src="{{ $user->photo_url }}" alt="Photo" style="width: 200px; height: 200px; border-radius:50%;">
                                @else
                                    <ion-icon name="person-circle-outline" style="width: 200px; height: 200px"></ion-icon>
                                @endif
                                <div class="clearfix"></div>
                                <div class="author-box-name">
                                    <p>{{ $user->nom }} {{ $user->prenom }}</p>
                                </div>
                                <div class="author-box-job">{{ $user->role->name ?? 'Utilisateur simple' }}</div>
                            </div>
                            <div class="text-center">
                                <a href="#" class="btn btn-social-icon mr-1 btn-facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="btn btn-social-icon mr-1 btn-twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="btn btn-social-icon mr-1 btn-github"><i class="fab fa-github"></i></a>
                                <a href="#" class="btn btn-social-icon mr-1 btn-instagram"><i class="fab fa-instagram"></i></a>
                            </div>

                            <div class="card-header mt-3">
                                <h4>Informations personnelles</h4>
                            </div>
                            <div class="card-body">
                                <div class="py-4">
                                    <p class="clearfix">
                                        <span class="float-left">Sexe</span>
                                        <span class="float-right text-muted">{{ $user->sexe ?? 'Non défini' }}</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">Date de naissance</span>
                                        <span class="float-right text-muted">{{ $user->date_naissance ? $user->date_naissance->format('d/m/Y') : 'Non défini' }}</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">Lieu de naissance</span>
                                        <span class="float-right text-muted">{{ $user->lieu_naissance ?? 'Non défini' }}</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">Téléphone</span>
                                        <span class="float-right text-muted">{{ $user->telephone ?? 'Non défini' }}</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">Adresse</span>
                                        <span class="float-right text-muted">{{ $user->adresse ?? 'Non défini' }}</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">Diplôme</span>
                                        <span class="float-right text-muted">{{ $user->diplome ?? 'Non défini' }}</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">Email</span>
                                        <span class="float-right text-muted">{{ $user->email }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-md-12 col-lg-8">
                    <div class="card">
                        <!-- Ici tu peux mettre des informations supplémentaires ou activité récente -->
                    </div>
                </div>

            </div>
        </div>
    </section>

   </div>
@endsection
