@extends('layouts.public')

@section('title', 'INSTI - Détails de l\'Offre')

@push('styles')
    <!-- CSS spécifique à cette page -->
    <link rel="stylesheet" href="{{ asset('css/pages/public/offre-details.css') }}">
@endpush

@section('content')
    <!-- BACK LINK -->
    <div class="back-link">
        <div class="container">
            <a href="{{ route('offers.index') }}">
                <i class="fas fa-arrow-left"></i> Retour aux offres
            </a>
        </div>
    </div>

    <!-- OFFER HEADER -->
    <section class="offer-header">
        <div class="container">
            <div class="offer-title-section">
                <h1 class="offer-title">Enseignant en Génie Électrique</h1>
                <div class="offer-meta">
                    <div class="meta-item">
                        <i class="fas fa-building"></i> Département Génie Électrique
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i> Temps plein
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i> Lokossa, Bénin
                    </div>
                </div>
                <div class="offer-availability">
                    <i class="fas fa-briefcase"></i> 2 Postes disponibles
                </div>
            </div>

            <div class="date-info">
                <div class="publication-date">
                    <div class="date-label">Publié le</div>
                    <div class="date-value">1er Décembre 2024</div>
                </div>
                <div class="deadline-date">
                    <div class="date-label">Date limite de candidature</div>
                    <div class="date-value">15 Janvier 2025</div>
                    <div class="deadline-remaining">
                        <i class="fas fa-clock"></i>
                        <span>il reste 9 jours</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- OFFER CONTENT GRID -->
    <div class="offer-content-grid">
        <div class="container">
            <div class="offer-main-content">
                <!-- DESCRIPTION SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-file-alt"></i> Description du poste
                    </h2>
                    <div class="description-text">
                        <p>L'Institut National Supérieur de Technologie Industrielle de Lokossa (INSTI) recrute un enseignant qualifié en Génie Électrique pour renforcer son équipe pédagogique et contribuer à la formation d'excellence de nos étudiants.</p>
                        <p>Le candidat retenu sera responsable de l'enseignement des cours théoriques et pratiques en génie électrique, de l'encadrement des travaux dirigés et pratiques, ainsi que de la supervision des projets d'étudiants.</p>
                        <p>Il/Elle participera également aux activités de recherche du département et contribuera au développement de partenariats avec le secteur industriel.</p>
                    </div>
                </section>

                <!-- MISSIONS SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-tasks"></i> Missions principales
                    </h2>
                    <ul class="missions-list">
                        <li>Assurer les cours magistraux, travaux dirigés et travaux pratiques</li>
                        <li>Encadrer et superviser les projets et mémoires d'étudiants</li>
                        <li>Participer aux activités de recherche du département</li>
                        <li>Contribuer aux programmes pédagogiques</li>
                        <li>Participer aux examens et jurys de délibération</li>
                        <li>Assurer une veille technologique</li>
                        <li>Développer des partenariats avec le secteur industriel</li>
                    </ul>
                </section>

                <!-- PROFILE SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-user-graduate"></i> Profil Recherché
                    </h2>

                    <div class="requirements-category">
                        <h4><i class="fas fa-graduation-cap"></i> Formation requise</h4>
                        <ul class="requirements-list">
                            <li>Doctorat (PhD) en Génie Électrique ou domaine connexe</li>
                            <li>Master avec expérience significative sera considéré</li>
                        </ul>
                    </div>

                    <div class="requirements-category">
                        <h4><i class="fas fa-briefcase"></i> Expérience</h4>
                        <ul class="requirements-list">
                            <li>Minimum 3 ans d'expérience dans l'enseignement supérieur</li>
                            <li>Expérience en recherche avec publications internationales</li>
                            <li>Expérience en encadrement de projets d'étudiants</li>
                        </ul>
                    </div>

                    <div class="requirements-category">
                        <h4><i class="fas fa-cogs"></i> Compétences</h4>
                        <ul class="requirements-list">
                            <li>Excellentes capacités pédagogiques et de communication</li>
                            <li>Anglais ou français obligatoires, l'autre souhaité</li>
                            <li>Compétences en gestion de projets</li>
                            <li>Aptitude au travail en équipe</li>
                            <li>Sens de l'innovation pédagogique</li>
                        </ul>
                    </div>
                </section>

                <!-- DOCUMENTS SECTION -->
                <section class="content-section">
                    <h2 class="section-title">
                        <i class="fas fa-file-upload"></i> Documents à fournir
                    </h2>
                    <ul class="documents-list">
                        <li>Curriculum vitae détaillé</li>
                        <li>Lettre de motivation</li>
                        <li>Copies certifiées des diplômes</li>
                        <li>Attestation de travail</li>
                        <li>Liste des publications scientifiques</li>
                        <li>Deux lettres de recommandation</li>
                        <li>Copie de la pièce d'identité</li>
                    </ul>
                </section>
            </div>

            <!-- SIDEBAR -->
            <div class="offer-sidebar">
                <section class="status-actions">
                    <div class="status-badge-large">
                        <i class="fas fa-check-circle"></i> Offre ouverte aux candidatures
                    </div>

                    <div class="actions-buttons">
                        @auth
                            <a href="{{ route('teacher.application.form', ['offer_id' => 1]) }}" class="apply-button" id="applyButton">
                                <i class="fas fa-paper-plane"></i> Postuler maintenant
                            </a>
                        @else
                            <a href="{{ route('login') }}" class="apply-button" id="applyButton">
                                <i class="fas fa-paper-plane"></i> Connectez-vous pour postuler
                            </a>
                        @endauth

                        <a href="#" class="save-button" id="saveButton">
                            <i class="far fa-bookmark"></i> Sauvegarder l'offre
                        </a>
                    </div>

                    <div class="application-alert" id="applicationAlert"></div>
                </section>

                <!-- OFFER INFO -->
                <section class="offer-info">
                    <h3 class="section-title">
                        <i class="fas fa-info-circle"></i> Informations
                    </h3>
                    <div class="info-item"><span class="info-label">Référence</span><span class="info-value">INSTI-2025-GE-001</span></div>
                    <div class="info-item"><span class="info-label">Type de contrat</span><span class="info-value">CDI - Temps plein</span></div>
                    <div class="info-item"><span class="info-label">Lieu de travail</span><span class="info-value">Campus INSTI - Lokossa</span></div>
                    <div class="info-item"><span class="info-label">Salaire</span><span class="info-value">Selon grille de la Fonction Publique</span></div>
                    <div class="info-item"><span class="info-label">Prise de fonction</span><span class="info-value">Septembre 2025</span></div>
                </section>

                <!-- CONTACT INFO -->
                <section class="contact-info-sidebar">
                    <h3><i class="fas fa-headset"></i> Contact</h3>
                    <p>Pour toute information concernant cette offre, contactez :</p>
                    <div class="contact-details">
                        <div class="contact-item">
                            <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                            <div class="contact-text"><strong>Email</strong><span>recruitment@insti.bj</span></div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon"><i class="fas fa-phone"></i></div>
                            <div class="contact-text"><strong>Téléphone</strong><span>(+229) 21 91 66 66</span></div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon"><i class="fas fa-clock"></i></div>
                            <div class="contact-text"><strong>Horaires</strong><span>Lun - Ven: 8h - 17h</span></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <!-- JS spécifique à cette page -->
    <script src="{{ asset('js/pages/public/offre-details.js') }}"></script>

    <!-- JS inline pour boutons application et sauvegarde -->
    <script>
        const menuToggle = document.getElementById('menuToggle');
        const headerMenu = document.querySelector('.header-menu');

        if (menuToggle && headerMenu) {
            menuToggle.addEventListener('click', () => {
                headerMenu.classList.toggle('active');
            });
        }

        const applyButton = document.getElementById('applyButton');
        const saveButton = document.getElementById('saveButton');
        const applicationAlert = document.getElementById('applicationAlert');

        function showAlert(message, type) {
            if (applicationAlert) {
                applicationAlert.innerHTML = `
                    <div class="alert alert-${type}">
                        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                        ${message}
                    </div>
                `;
                setTimeout(() => { applicationAlert.innerHTML = ''; }, 5000);
            }
        }

        if (applyButton) {
            applyButton.addEventListener('click', function(e) {
                if (!this.href.includes('application/form')) {
                    e.preventDefault();
                    showAlert('Connectez-vous pour postuler à cette offre.', 'warning');
                }
            });
        }

        if (saveButton) {
            saveButton.addEventListener('click', function(e) {
                e.preventDefault();
                showAlert('Offre sauvegardée dans vos favoris.', 'success');
                this.innerHTML = '<i class="fas fa-bookmark"></i> Sauvegardée';
                this.classList.add('saved');
            });
        }
    </script>
@endpush
