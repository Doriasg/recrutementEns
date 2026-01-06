@extends('dashboard')

@section('title', 'INSTI - Tableau de Bord Enseignant')

@section('content')
<div class="main-content">
    <section class="section">

        {{-- BIENVENUE --}}
        <div class="row mb-4">
            <div class="col-12">
                <h4>Bienvenue {{ Auth::user()->name ?? 'ADJOVI Jean' }}</h4>
                <p class="text-muted">
                    Spécialité : Génie Électrique <br>
                    Statut : Candidatures en cours d’examen
                </p>
            </div>
        </div>

        {{-- STATISTIQUES --}}
        <div class="row">

            {{-- Candidatures --}}
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div class="card">
                    <div class="card-statistic-4">
                        <div class="row">
                            <div class="col-6 pt-3">
                                <div class="card-content">
                                    <h5 class="font-15">Candidatures</h5>
                                    <h2 class="mb-3 font-18">3</h2>
                                    <p class="mb-0"><span class="col-orange">En cours</span></p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="banner-img">
                                    <img src="{{ asset('img/banner/1.png') }}" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Acceptées --}}
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div class="card">
                    <div class="card-statistic-4">
                        <div class="row">
                            <div class="col-6 pt-3">
                                <div class="card-content">
                                    <h5 class="font-15">Acceptées</h5>
                                    <h2 class="mb-3 font-18">1</h2>
                                    <p class="mb-0"><span class="col-green">Validée</span></p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="banner-img">
                                    <img src="{{ asset('img/banner/2.png') }}" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- En attente --}}
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div class="card">
                    <div class="card-statistic-4">
                        <div class="row">
                            <div class="col-6 pt-3">
                                <div class="card-content">
                                    <h5 class="font-15">En attente</h5>
                                    <h2 class="mb-3 font-18">2</h2>
                                    <p class="mb-0"><span class="col-orange">En traitement</span></p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="banner-img">
                                    <img src="{{ asset('img/banner/3.png') }}" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Offres consultées --}}
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div class="card">
                    <div class="card-statistic-4">
                        <div class="row">
                            <div class="col-6 pt-3">
                                <div class="card-content">
                                    <h5 class="font-15">Offres vues</h5>
                                    <h2 class="mb-3 font-18">24</h2>
                                    <p class="mb-0"><span class="col-green">Actives</span></p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="banner-img">
                                    <img src="{{ asset('img/banner/4.png') }}" alt="">
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
