@extends('public')

@section('content')
    <!-- HERO SECTION -->
    <section class="hero-section">
        <div class="hero-overlay"></div>
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

@push('page-styles')
    <!-- Styles spécifiques à la page home -->
    <style>
        /* Styles additionnels si nécessaire */
        .hero-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
            background: linear-gradient(rgba(10, 63, 143, 0.9), rgba(11, 79, 163, 0.9)),
                        url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            position: relative;
        }
        
        .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            color: white;
            text-align: center;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .hero-content h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }
        
        .hero-content p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-button {
            display: inline-block;
            padding: 1rem 2rem;
            background: #ff6b35;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background 0.3s ease;
        }
        
        .cta-button:hover {
            background: #e55a2b;
        }
    </style>
@endpush

@push('page-scripts')
    <!-- Script pour le changement d'image du hero -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const heroSection = document.querySelector('.hero-section');
            const images = [
                'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
            ];
            let currentIndex = 0;

            function changeBackground() {
                if (heroSection) {
                    heroSection.style.backgroundImage = linear-gradient(rgba(10, 63, 143, 0.9), rgba(11, 79, 163, 0.9)), url('${images[currentIndex]}');
                    currentIndex = (currentIndex + 1) % images.length;
                }
            }

            // Changer l'image toutes les 30 secondes
            setInterval(changeBackground, 30000);
            
            // Ajouter une animation aux statistiques au défilement
            const statsSection = document.querySelector('.stats-section');
            const statNumbers = document.querySelectorAll('.stat-number');
            
            function animateStats() {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    let current = 0;
                    const increment = Math.ceil(target / 50);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        } else {
                            stat.textContent = current;
                        }
                    }, 30);
                });
            }
            
            // Observer pour animer les stats quand ils sont visibles
            if (statsSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(statsSection);
            }
        });
    </script>
@endpush