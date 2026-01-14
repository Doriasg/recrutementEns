@extends('dashboard')

@section('title', 'INSTI - Profil Enseignant')

@section('content')
<div class="main-content">
    <section class="section">

        {{-- TITRE --}}
        <div class="section-header">
            <h1>Profil Enseignant</h1>
        </div>

        <div class="row">

            {{-- COLONNE GAUCHE : PHOTO + INFOS --}}
            <div class="col-12 col-md-4 col-lg-4">
                <div class="card profile-widget">
                    <div class="profile-widget-header">
                        <img alt="image"
                             src="{{ asset('img/avatar/avatar-1.png') }}"
                             class="rounded-circle profile-widget-picture">
                    </div>

                    <div class="profile-widget-description">
                        <div class="profile-widget-name">
                            {{ Auth::user()->name ?? 'ADJOVI Jean' }}
                            <div class="text-muted d-inline font-weight-normal">
                                <div class="slash"></div>
                                Enseignant
                            </div>
                        </div>

                        <p>
                            Enseignant spécialisé en Génie Électrique, passionné par
                            la transmission du savoir et la formation des étudiants.
                        </p>
                    </div>

                    <div class="card-footer text-center">
                        <div class="font-weight-bold mb-2">Informations clés</div>
                        <div class="row">
                            <div class="col-6">
                                <div class="font-weight-bold">5+</div>
                                <div class="text-small text-muted">Années d'expérience</div>
                            </div>
                            <div class="col-6">
                                <div class="font-weight-bold">3</div>
                                <div class="text-small text-muted">Candidatures</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- COLONNE DROITE : DÉTAILS --}}
            <div class="col-12 col-md-8 col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h4>Informations personnelles</h4>
                    </div>

                    <div class="card-body">
                        <div class="row">

                            <div class="col-md-6">
                                <p><strong>Nom complet :</strong><br> ADJOVI Jean</p>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Email :</strong><br> adjovi.jean@gmail.com</p>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Téléphone :</strong><br> +229 90 00 00 00</p>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Spécialité :</strong><br> Génie Électrique</p>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Diplôme :</strong><br> Master / Doctorat</p>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Disponibilité :</strong><br> Immédiate</p>
                            </div>

                        </div>
                    </div>
                </div>

                {{-- EXPÉRIENCE --}}
                <div class="card mt-3">
                    <div class="card-header">
                        <h4>Expérience professionnelle</h4>
                    </div>

                    <div class="card-body">
                        <ul>
                            <li>
                                <strong>Enseignant vacataire</strong> – INSTI <br>
                                <small class="text-muted">2021 – 2024</small>
                            </li>
                            <li class="mt-2">
                                <strong>Assistant pédagogique</strong> – Université <br>
                                <small class="text-muted">2019 – 2021</small>
                            </li>
                        </ul>
                    </div>
                </div>

                {{-- BOUTON --}}
                <div class="text-right mt-3">
                    <a href="#" class="btn btn-primary">
                        Modifier mon profil
                    </a>
                </div>

            </div>
        </div>

    </section>
</div>
@endsection
