@extends('layouts.public')

@section('title', 'INSTI - Recrutement Enseignants')

@push('styles')
    <!-- CSS spécifique à cette page -->
    <link rel="stylesheet" href="{{ asset('css/pages/public/home.css') }}">
@endpush

@section('content')
    <!-- HERO SECTION -->
    <section class="hero-section">
        <div class="hero-content">
            <h1>Recrutement d'Enseignants</h1>
            <p>Rejoignez notre équipe pédagogique et contribuez à former la prochaine génération d'ingénieurs et de techniciens supérieurs.</p>
            <a href="#" class="cta-button">Postuler maintenant</a>
        </div>
    </section>

    <!-- OFFRES SECTION -->
    <section class="offers-section" id="offres">
        <div class="offers-header">
            <h2>Offres d'emploi actuelles</h2>
            <p>Consultez les postes disponibles et postulez en ligne.</p>
        </div>
        <div class="offers-grid">
            <!-- Offre 1 -->
            <div class="offer-card">
                <div class="offer-badge">Recrutement</div>
                <div class="offer-content">
                    <h3 class="offer-title">Enseignant en Génie Électrique</h3>
                    <div class="offer-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>Département Génie Électrique</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Temps plein</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Lokossa, Bénin</span>
                        </div>
                    </div>
                    <div class="deadline">
                        <i class="fas fa-calendar-alt"></i> Date limite : <span>15 Janvier 2024</span>
                    </div>
                    <div class="offer-footer">
                        <div class="offer-count">2 Postes</div>
                        <a href="#" class="apply-button">Détails</a>
                    </div>
                </div>
            </div>

            <!-- Offre 2 -->
            <div class="offer-card">
                <div class="offer-badge">Recrutement</div>
                <div class="offer-content">
                    <h3 class="offer-title">Enseignant en Génie Mécanique</h3>
                    <div class="offer-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>Département Génie Mécanique</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Temps plein</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Lokossa, Bénin</span>
                        </div>
                    </div>
                    <div class="deadline">
                        <i class="fas fa-calendar-alt"></i> Date limite : <span>26 Janvier 2024</span>
                    </div>
                    <div class="offer-footer">
                        <div class="offer-count">2 Postes</div>
                        <a href="#" class="apply-button">Détails</a>
                    </div>
                </div>
            </div>

            <!-- Offre 3 -->
            <div class="offer-card">
                <div class="offer-badge">Recrutement</div>
                <div class="offer-content">
                    <h3 class="offer-title">Enseignant en Informatique et Réseaux</h3>
                    <div class="offer-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>Département Informatique</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Temps plein</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Lokossa, Bénin</span>
                        </div>
                    </div>
                    <div class="deadline">
                        <i class="fas fa-calendar-alt"></i> Date limite : <span>31 Janvier 2024</span>
                    </div>
                    <div class="offer-footer">
                        <div class="offer-count">2 Postes</div>
                        <a href="#" class="apply-button">Détails</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="view-all-offers">
            <a href="#" class="view-all-link">
                Voir toutes les offres
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </section>

    <!-- PROCESS SECTION -->
    <section class="process-section">
        <div class="process-container">
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
    <section class="stats-section">
        <div class="stats-container">
            <div class="stat-item">
                <div class="stat-number">24</div>
                <div class="stat-label">Postes Ouverts</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">356</div>
                <div class="stat-label">Candidats</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">15</div>
                <div class="stat-label">Départements</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">98</div>
                <div class="stat-label">% Satisfaction</div>
            </div>
        </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta-section">
        <h2>Prêt à nous rejoindre ?</h2>
        <p>Postulez dès maintenant et devenez membre de notre équipe pédagogique d'excellence.</p>
        <div class="cta-buttons">
            <a href="#" class="cta-button-primary">Postuler maintenant</a>
            <a href="#" class="cta-button-secondary">Accéder à mon compte</a>
        </div>
    </section>
@endsection

@push('scripts')
    <!-- JS spécifique à cette page -->
    <script src="{{ asset('js/pages/public/home.js') }}"></script>

    <!-- JS inline pour le slider du hero -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const heroSection = document.querySelector('.hero-section');
            const images = [
                '{{ asset("assets/images/hero1.jpeg") }}',
                '{{ asset("assets/images/hero2.jpeg") }}',
                '{{ asset("assets/images/hero3.jpg") }}'
            ];
            let currentIndex = 0;

            function changeBackground() {
                heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
                currentIndex = (currentIndex + 1) % images.length;
            }

            changeBackground();
            setInterval(changeBackground, 30000);
        });
    </script>
@endpush
