@extends('layouts.public')

@section('title', 'INSTI - Offres d\'Emploi')

@section('content')
    <!-- HERO HEADER -->
    <div class="hero-header">
        <div class="container">
            <h1>Offres d'Emploi</h1>
            <p>Découvrez toutes les opportunités de carrière à l'INSTI</p>
        </div>
    </div>

    <!-- FILTERS SECTION -->
    <section class="filters-section">
        <div class="container">
            <div class="filters-card">
                <h3><i class="fas fa-filter"></i> Filtres de recherche</h3>
                <div class="filter-grid">
                    <div class="filter-group">
                        <label>Département</label>
                        <select>
                            <option value="">Tous les départements</option>
                            <option value="electrique">Génie Électrique</option>
                            <option value="mecanique">Génie Mécanique</option>
                            <option value="informatique">Informatique</option>
                            <option value="civil">Génie Civil</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Type de contrat</label>
                        <select>
                            <option value="">Tous les contrats</option>
                            <option value="cdi">CDI</option>
                            <option value="cdd">CDD</option>
                            <option value="temps-plein">Temps plein</option>
                            <option value="temps-partiel">Temps partiel</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Date limite</label>
                        <select>
                            <option value="">Toutes les dates</option>
                            <option value="7">7 prochains jours</option>
                            <option value="30">30 prochains jours</option>
                            <option value="90">3 prochains mois</option>
                        </select>
                    </div>
                    <button class="btn-apply-filter">
                        <i class="fas fa-search"></i> Appliquer les filtres
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- OFFERS LIST -->
    <section class="offers-list-section">
        <div class="container">
            <div class="section-header">
                <h2><i class="fas fa-briefcase"></i> Offres disponibles (24)</h2>
                <div class="sort-options">
                    <span>Trier par :</span>
                    <select>
                        <option value="date">Date de publication</option>
                        <option value="deadline">Date limite</option>
                        <option value="department">Département</option>
                    </select>
                </div>
            </div>

            <div class="offers-list">
                <!-- Offer Item 1 -->
                <div class="offer-item">
                    <div class="offer-badge">Nouveau</div>
                    <div class="offer-content">
                        <h3 class="offer-title">Enseignant en Génie Électrique</h3>
                        <div class="offer-meta">
                            <span><i class="fas fa-building"></i> Département Génie Électrique</span>
                            <span><i class="fas fa-clock"></i> Temps plein</span>
                            <span><i class="fas fa-map-marker-alt"></i> Lokossa, Bénin</span>
                        </div>
                        <p class="offer-description">
                            Enseignement des cours théoriques et pratiques en génie électrique, encadrement des travaux dirigés...
                        </p>
                        <div class="offer-footer">
                            <div class="deadline">
                                <i class="fas fa-calendar-alt"></i>
                                Date limite : <strong>15 Janvier 2025</strong>
                            </div>
                            <div class="offer-actions">
                                <span class="post-count">2 Postes</span>
                                <a href="{{ route('offers.details', ['id' => 1]) }}" class="btn-details">Voir détails</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Offer Item 2 -->
                <div class="offer-item">
                    <div class="offer-badge">Urgent</div>
                    <div class="offer-content">
                        <h3 class="offer-title">Enseignant en Informatique et Réseaux</h3>
                        <div class="offer-meta">
                            <span><i class="fas fa-building"></i> Département Informatique</span>
                            <span><i class="fas fa-clock"></i> Temps plein</span>
                            <span><i class="fas fa-map-marker-alt"></i> Lokossa, Bénin</span>
                        </div>
                        <p class="offer-description">
                            Enseignement des cours d'informatique, réseaux et systèmes d'information, développement d'applications...
                        </p>
                        <div class="offer-footer">
                            <div class="deadline">
                                <i class="fas fa-calendar-alt"></i>
                                Date limite : <strong>31 Janvier 2025</strong>
                            </div>
                            <div class="offer-actions">
                                <span class="post-count">2 Postes</span>
                                <a href="{{ route('offers.details', ['id' => 2]) }}" class="btn-details">Voir détails</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Offer Item 3 -->
                <div class="offer-item">
                    <div class="offer-badge">Recrutement</div>
                    <div class="offer-content">
                        <h3 class="offer-title">Enseignant en Génie Mécanique</h3>
                        <div class="offer-meta">
                            <span><i class="fas fa-building"></i> Département Génie Mécanique</span>
                            <span><i class="fas fa-clock"></i> Temps plein</span>
                            <span><i class="fas fa-map-marker-alt"></i> Lokossa, Bénin</span>
                        </div>
                        <p class="offer-description">
                            Enseignement des cours de mécanique, thermodynamique, conception mécanique, et encadrement des projets...
                        </p>
                        <div class="offer-footer">
                            <div class="deadline">
                                <i class="fas fa-calendar-alt"></i>
                                Date limite : <strong>26 Janvier 2025</strong>
                            </div>
                            <div class="offer-actions">
                                <span class="post-count">2 Postes</span>
                                <a href="{{ route('offers.details', ['id' => 3]) }}" class="btn-details">Voir détails</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Offer Item 4 -->
                <div class="offer-item">
                    <div class="offer-badge">Nouveau</div>
                    <div class="offer-content">
                        <h3 class="offer-title">Enseignant en Mathématiques Appliquées</h3>
                        <div class="offer-meta">
                            <span><i class="fas fa-building"></i> Département Science Fondamentale</span>
                            <span><i class="fas fa-clock"></i> Temps plein</span>
                            <span><i class="fas fa-map-marker-alt"></i> Lokossa, Bénin</span>
                        </div>
                        <p class="offer-description">
                            Enseignement des mathématiques appliquées, algèbre linéaire, analyse numérique, et statistiques...
                        </p>
                        <div class="offer-footer">
                            <div class="deadline">
                                <i class="fas fa-calendar-alt"></i>
                                Date limite : <strong>20 Février 2025</strong>
                            </div>
                            <div class="offer-actions">
                                <span class="post-count">1 Poste</span>
                                <a href="{{ route('offers.details', ['id' => 4]) }}" class="btn-details">Voir détails</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PAGINATION -->
            <div class="pagination">
                <a href="#" class="page-link active">1</a>
                <a href="#" class="page-link">2</a>
                <a href="#" class="page-link">3</a>
                <span class="page-dots">...</span>
                <a href="#" class="page-link">10</a>
                <a href="#" class="page-link next">
                    Suivant <i class="fas fa-chevron-right"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Vous ne trouvez pas l'offre qui vous correspond ?</h2>
                <p>Inscrivez-vous pour être alerté des nouvelles offres correspondant à votre profil.</p>
                <div class="cta-buttons">
                    <a href="{{ route('register') }}" class="btn-primary">
                        <i class="fas fa-user-plus"></i> Créer un compte
                    </a>
                    <a href="{{ route('login') }}" class="btn-secondary">
                        <i class="fas fa-sign-in-alt"></i> Se connecter
                    </a>
                </div>
            </div>
        </div>
    </section>
@endsection
