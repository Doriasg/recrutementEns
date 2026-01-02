@extends('layouts.teacher')

@section('title', 'INSTI - Mes Candidatures')

@section('content')
    <header class="header-blue">
        <div class="container">
            <h1>Mes Candidatures</h1>
            <p>Suivez l'état d'avancement de vos candidatures en temps réel</p>
        </div>
    </header>

    <main class="container content">
        <section class="card stats-filter-section">
            <div class="filters">
                <select id="filterStatus">
                    <option value="all">Toutes les candidatures</option>
                    <option value="active">En cours</option>
                    <option value="accepted">Acceptées</option>
                    <option value="rejected">Rejetées</option>
                </select>
                <select id="filterSort">
                    <option value="newest">Plus récentes</option>
                    <option value="oldest">Plus anciennes</option>
                </select>
                <button class="btn-filter"><i class="fas fa-filter"></i> Filtres avancés</button>
            </div>
            <div class="stats-grid">
                <div class="stat-box">
                    <strong>3</strong>
                    <span>Total</span>
                </div>
                <div class="stat-box orange">
                    <strong>2</strong>
                    <span>En examen</span>
                </div>
                <div class="stat-box green">
                    <strong>1</strong>
                    <span>Acceptée</span>
                </div>
                <div class="stat-box red">
                    <strong>0</strong>
                    <span>Rejetée</span>
                </div>
            </div>
        </section>

        <!-- Application 1 (Accepted) -->
        <div class="card job-card">
            <div class="job-header">
                <div class="job-title">
                    <i class="fas fa-file-lines"></i>
                    <div>
                        <h3>Enseignant en Informatique et Réseaux</h3>
                        <p>Département Informatique</p>
                    </div>
                </div>
                <span class="badge green">Acceptée</span>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-hashtag"></i> Réf: INSTI-2025-INF-001</span>
                <span><i class="far fa-calendar"></i> Soumise le 10 Déc 2024</span>
            </div>
            <div class="progress-container">
                <div class="progress-text">
                    <span>Progression du processus</span>
                    <strong>100%</strong>
                </div>
                <div class="progress-bar">
                    <div class="fill" style="width: 100%;"></div>
                </div>
            </div>
            <div class="job-footer">
                <div class="steps">
                    <span class="step active">Soumise</span>
                    <span class="step active">Reçue</span>
                    <span class="step active">En évaluation</span>
                    <span class="step active">Décision Finale</span>
                </div>
                <a href="{{ route('teacher.application.details', ['id' => 1]) }}" class="view-details">
                    <i class="fas fa-eye"></i> Voir les détails
                </a>
            </div>
        </div>

        <div class="alert-success">
            <div class="alert-content">
                <i class="fas fa-circle-check"></i>
                <div>
                    <strong>Félicitation ! Votre candidature a été acceptée</strong>
                    <p>Vous recevrez prochainement un email avec les prochaines étapes.</p>
                </div>
            </div>
            <button class="btn-download">
                <i class="fas fa-download"></i> Télécharger la lettre d'acceptation
            </button>
        </div>

        <!-- Application 2 (Pending) -->
        <div class="card job-card">
            <div class="job-header">
                <div class="job-title">
                    <i class="fas fa-file-lines"></i>
                    <div>
                        <h3>Enseignant en Génie Électrique</h3>
                        <p>Département Génie Électrique</p>
                    </div>
                </div>
                <span class="badge orange">En examen</span>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-hashtag"></i> Réf: INSTI-2025-GE-002</span>
                <span><i class="far fa-calendar"></i> Soumise le 12 Déc 2024</span>
            </div>
            <div class="progress-container">
                <div class="progress-text">
                    <span>Progression du processus</span>
                    <strong>60%</strong>
                </div>
                <div class="progress-bar">
                    <div class="fill" style="width: 60%;"></div>
                </div>
            </div>
            <div class="job-footer">
                <div class="steps">
                    <span class="step active">Soumise</span>
                    <span class="step active">Reçue</span>
                    <span class="step active">En évaluation</span>
                    <span class="step">Décision Finale</span>
                </div>
                <a href="{{ route('teacher.application.details', ['id' => 2]) }}" class="view-details">
                    <i class="fas fa-eye"></i> Voir les détails
                </a>
            </div>
        </div>

        <!-- Application 3 (Pending) -->
        <div class="card job-card">
            <div class="job-header">
                <div class="job-title">
                    <i class="fas fa-file-lines"></i>
                    <div>
                        <h3>Enseignant en Mathématique Appliquée</h3>
                        <p>Département Science Fondamentale</p>
                    </div>
                </div>
                <span class="badge orange">En examen</span>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-hashtag"></i> Réf: INSTI-2025-MATH-003</span>
                <span><i class="far fa-calendar"></i> Soumise le 05 Déc 2024</span>
            </div>
            <div class="progress-container">
                <div class="progress-text">
                    <span>Progression du processus</span>
                    <strong>45%</strong>
                </div>
                <div class="progress-bar">
                    <div class="fill" style="width: 45%;"></div>
                </div>
            </div>
            <div class="job-footer">
                <div class="steps">
                    <span class="step active">Soumise</span>
                    <span class="step active">Reçue</span>
                    <span class="step">En évaluation</span>
                    <span class="step">Décision Finale</span>
                </div>
                <a href="{{ route('teacher.application.details', ['id' => 3]) }}" class="view-details">
                    <i class="fas fa-eye"></i> Voir les détails
                </a>
            </div>
        </div>

        <div class="pagination">
            <button class="pagination-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <span class="pagination-dots">...</span>
            <button class="pagination-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
    </main>
@endsection

@push('scripts')
<script>
    // Filter functionality
    const filterStatus = document.getElementById('filterStatus');
    const filterSort = document.getElementById('filterSort');
    const jobCards = document.querySelectorAll('.job-card');

    if (filterStatus) {
        filterStatus.addEventListener('change', function() {
            const status = this.value;
            jobCards.forEach(card => {
                const badge = card.querySelector('.badge');
                const badgeStatus = badge.classList.contains('green') ? 'accepted' : 
                                 badge.classList.contains('orange') ? 'active' : 
                                 badge.classList.contains('red') ? 'rejected' : 'all';
                
                if (status === 'all' || status === badgeStatus) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Sort functionality
    if (filterSort) {
        filterSort.addEventListener('change', function() {
            const sortBy = this.value;
            const container = document.querySelector('.content');
            const cards = Array.from(jobCards);
            
            cards.sort((a, b) => {
                const dateA = new Date(a.querySelector('.job-meta span:nth-child(2)').textContent.replace('Soumise le ', ''));
                const dateB = new Date(b.querySelector('.job-meta span:nth-child(2)').textContent.replace('Soumise le ', ''));
                
                return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
            });
            
            cards.forEach(card => container.appendChild(card));
        });
    }

    // Download button
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('Téléchargement de la lettre d\'acceptation...');
            // In a real app, this would trigger a file download
        });
    }
</script>
@endpush
