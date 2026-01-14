@extends('layouts.public')

@section('title', 'INSTI - Offres d\'Emploi')

@push('styles')
    <!-- CSS spécifique à cette page -->
    <link rel="stylesheet" href="{{ asset('css/pages/public/offers.css') }}">
@endpush

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
                <!-- Offre exemple -->
                @foreach($offers as $offer)
                    <div class="offer-item">
                        <div class="offer-badge">{{ $offer->badge }}</div>
                        <div class="offer-content">
                            <h3 class="offer-title">{{ $offer->title }}</h3>
                            <div class="offer-meta">
                                <span><i class="fas fa-building"></i> {{ $offer->department }}</span>
                                <span><i class="fas fa-clock"></i> {{ $offer->contract_type }}</span>
                                <span><i class="fas fa-map-marker-alt"></i> {{ $offer->location }}</span>
                            </div>
                            <p class="offer-description">{{ $offer->short_description }}</p>
                            <div class="offer-footer">
                                <div class="deadline">
                                    <i class="fas fa-calendar-alt"></i>
                                    Date limite : <strong>{{ $offer->deadline->format('d M Y') }}</strong>
                                </div>
                                <div class="offer-actions">
                                    <span class="post-count">{{ $offer->positions }} Poste{{ $offer->positions > 1 ? 's' : '' }}</span>
                                    <a href="{{ route('offers.details', ['id' => $offer->id]) }}" class="btn-details">Voir détails</a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- PAGINATION -->
            <div class="pagination">
                {{ $offers->links('vendor.pagination.default') }}
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

@push('scripts')
    <!-- JS spécifique à cette page -->
    <script src="{{ asset('js/pages/public/offers.js') }}"></script>

    <!-- Exemple JS pour filtres -->
    <script>
        document.querySelector('.btn-apply-filter')?.addEventListener('click', function() {
            const department = document.querySelector('select[name="department"]')?.value;
            const contract = document.querySelector('select[name="contract_type"]')?.value;
            const deadline = document.querySelector('select[name="deadline"]')?.value;

            alert(`Filtres appliqués : Département=${department}, Contrat=${contract}, Deadline=${deadline}`);
        });
    </script>
@endpush
