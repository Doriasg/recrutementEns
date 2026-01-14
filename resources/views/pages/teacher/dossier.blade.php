@extends('dashboard')

@section('content')
<div class="main-content">
    <section class="section">

        <!-- Titre + bouton -->
        <div class="section-header">
            <h1>Dossier du candidat</h1>
            <div class="section-header-button">
                <a href="{{ route('form.enseignant') }}"
                   class="btn btn-warning">
                    <i class="fas fa-edit"></i> Modifier
                </a>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">

                    <!-- Carte principale -->
                    <div class="card">
                        <div class="card-header">
                            <h4>Informations du candidat</h4>
                        </div>

                        <div class="card-body">

                            <!-- Infos personnelles -->
                            <h6 class="text-primary mb-3">
                                <i class="fas fa-user"></i> Informations personnelles
                            </h6>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <strong>Nom:</strong>
                                    <p class="text-muted">{{ $candidat->nom }}</p>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <strong>Prénoms:</strong>
                                    <p class="text-muted">{{ $candidat->prenoms }}</p>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <strong>Email:</strong>
                                    <p class="text-muted">{{ $candidat->email }}</p>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <strong>Téléphone:</strong>
                                    <p class="text-muted">{{ $candidat->telephone }}</p>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <strong>Date de naissance:</strong>
                                    <p class="text-muted">{{ $candidat->date_naissance }}</p>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <strong>Sexe:</strong>
                                    <p class="text-muted">{{ $candidat->sexe }}</p>
                                </div>
                            </div>

                            <hr>

                            <!-- Parcours académique -->
                            <h6 class="text-primary mb-3">
                                <i class="fas fa-graduation-cap"></i> Parcours académique
                            </h6>
                            <hr>

                            <!-- Documents -->
                            <h6 class="text-primary mb-3">
                                <i class="fas fa-file-alt"></i> Documents fournis
                            </h6>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <a href="{{ asset('storage/'.$candidat->cv) }}"
                                       target="_blank"
                                       class="btn btn-outline-primary btn-block">
                                        <i class="fas fa-eye"></i> Voir le CV
                                    </a>
                                </div>

                                <div class="col-md-4 mb-3">
                                    <a href="{{ asset('storage/'.$candidat->lettre_motivation) }}"
                                       target="_blank"
                                       class="btn btn-outline-primary btn-block">
                                        <i class="fas fa-eye"></i> Lettre de motivation
                                    </a>
                                </div>

                                <div class="col-md-4 mb-3">
                                    <a href="{{ asset('storage/'.$candidat->diplome_fichier) }}"
                                       target="_blank"
                                       class="btn btn-outline-primary btn-block">
                                        <i class="fas fa-eye"></i> Diplôme
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- Fin carte -->

                </div>
            </div>
        </div>
    </section>
</div>
@endsection
