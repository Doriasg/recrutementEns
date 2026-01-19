@extends('public')
@section('content')
<!-- LOADER -->
<div class="loader" id="loader">
    <div class="loader-spinner"></div>
</div>

<!-- SCROLL PROGRESS -->
<div class="scroll-progress" id="scrollProgress"></div>

<!-- BACK TO TOP -->
<div class="back-to-top" id="backToTop">
    <i class="fas fa-chevron-up"></i>
</div>

<!-- BOUTON POUR LES INSTRUCTIONS -->
<div class="instructions-toggle" id="instructionsToggle">
    <i class="fas fa-info"></i>
</div>



<!-- HERO SECTION -->
<section class="hero-section" id="hero">
    <div class="hero-background">
        <!-- REMPLACEZ CES LIENS AVEC VOS PROPRES IMAGES -->
        <div class="hero-slide hero-slide-1 active"></div>
        <div class="hero-slide hero-slide-2"></div>
        <div class="hero-slide hero-slide-3"></div>
        <div class="hero-slide hero-slide-4"></div>
        <div class="hero-slide hero-slide-5"></div>
    </div>

    <div class="hero-overlay"></div>

    <!-- Floating elements -->
    <div class="floating-element floating-1"></div>
    <div class="floating-element floating-2"></div>

    <div class="hero-content container">
        <h1 class="animate__animated animate__fadeInUp">Bienvenue à l'INSTI</h1>
        <p class="animate__animated animate__fadeInUp">Rejoignez notre équipe pédagogique et contribuez à former la prochaine génération d'ingénieurs et de techniciens supérieurs.</p>
        <a href="#offres" class="cta-button animate__animated animate__fadeInUp">Postuler maintenant</a>
    </div>

    <!-- Slider controls -->
    <div class="hero-slider-controls">
        <div class="hero-slide"></div>

    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll-indicator">
        <div class="scroll-arrow"></div>
    </div>
</section>

<!-- OFFRES SECTION -->
<!-- OFFRES SECTION -->
<section class="offers-section section-hidden" id="offres">
    <div class="container">
        <div class="offers-header">
            <h2>Offres d'emploi actuelles</h2>
         @if($appels->isnotEmpty())
            <p>Consultez les postes disponibles et postulez en ligne.</p>
        </div>

        <div class="offers-grid">
           
            @foreach($appels as $appel)
            <!-- Offre 1 -->
            <div class="offer-card col-md-4">

                <div class="offer-header">
                    <h3 class="offer-title">{{ $appel->title }}</h3>
                    <p class="offer-description">{{ $appel->description }}</p>
                </div>

                <div class="offer-content">
                    <div class="deadline">
                        <div class="deadline-content">
                            <i class="fas fa-calendar-alt"></i>
                            <div class="deadline-text">
                                <span class="deadline-label">Date limite</span>
                                <span class="deadline-date">{{ $appel->date_fin}}</span>
                            </div>

                        </div>
                    </div>
                    <div>
                        <a href="{{ asset('storage/' . $appel->fichier_url) }}" class="download-link">
                            <i class="fas fa-download"></i> Détails
                        </a>
                    </div>
                    <div class="offer-footer">
                        <div class="offer-salary">
                            <i class="fas fa-money-bill-wave"></i> Salaire compétitif
                        </div>
                        <a href="{{ auth()->check() ? route('candidater.enseignant', $appel->id) : route('login') }}"
   class="apply-button">
   <i class="fas fa-paper-plane"></i> Postuler
</a>


                    </div>
                </div>
            </div>
            @endforeach
           
        </div>

        <div class="view-all-offers">
            <a href="#" class="view-all-link">
                Voir toutes les offres
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
         @else
            <div>{{ "Aucun appel en cours" }}</div>
            @endif
    </div>
</section>
<!-- PROCESS SECTION -->
<section class="process-section section-hidden">
    <div class="process-container container">
        <div class="process-header">
            <h2>Processus de Recrutement</h2>
        </div>

        <div class="process-steps">
            <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <h3>Inscription</h3>
                <p>Créez votre compte candidat sur notre plateforme de recrutement en ligne</p>
            </div>

            <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-icon">
                    <i class="fas fa-file-upload"></i>
                </div>
                <h3>Candidature</h3>
                <p>Soumettez votre dossier complet (CV, lettre de motivation, diplômes)</p>
            </div>

            <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-icon">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <h3>Évaluation</h3>
                <p>Examen de votre dossier par notre comité de sélection</p>
            </div>

            <div class="process-step">
                <div class="step-number">4</div>
                <div class="step-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>Résultats</h3>
                <p>Notification des résultats et convocation aux entretiens</p>
            </div>
        </div>
    </div>
</section>

<!-- STATS SECTION -->
<section class="stats-section section-hidden">
    <div class="container">
        <div class="stats-container">
            <div class="stat-item">
                <div class="stat-number counter" data-count="24">0</div>
                <div class="stat-label">Postes Ouverts</div>
            </div>
            <div class="stat-item">
                <div class="stat-number counter" data-count="356">0</div>
                <div class="stat-label">Candidats</div>
            </div>
            <div class="stat-item">
                <div class="stat-number counter" data-count="15">0</div>
                <div class="stat-label">Départements</div>
            </div>
            <div class="stat-item">
                <div class="stat-number counter" data-count="98">0</div>
                <div class="stat-label">% Satisfaction</div>
            </div>
        </div>
    </div>
</section>

<!-- CTA SECTION -->
<section class="cta-section section-hidden">
    <div class="container">
        <h2>Prêt à nous rejoindre ?</h2>
        <p>Postulez dès maintenant et devenez membre de notre équipe pédagogique d'excellence.</p>
        <div class="cta-buttons">
            <a href="#" class="cta-button-primary">Postuler maintenant</a>
            <a href="#" class="cta-button-secondary">Accéder à mon compte</a>
        </div>
    </div>
</section>



<!-- PARTICLES CONTAINER -->
<div class="particles-container" id="particlesContainer"></div>
@endsection