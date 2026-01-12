@extends('dashboard')

@section('title', 'INSTI - Détails de la Candidature')

@section('content')
    <!-- Main Content Structure -->
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Détails de la Candidature</h1>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item">
                        <a href="{{ route('dashboard.enseignant') }}">Tableau de Bord</a>
                    </div>
                    <div class="breadcrumb-item">
                        <a href="#">Mes Candidatures</a>
                    </div>
                    <div class="breadcrumb-item active">Détails</div>
                </div>
            </div>

            <div class="section-body">
                <!-- APPLICATION HEADER -->
                <div class="row">
                    <div class="col-12">
                        <div class="card card-hero">
                            
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-md-8">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-lg bg-primary mr-4">
                                                <i class="fas fa-user-tie fa-2x"></i>
                                            </div>
                                            <div>
                                                <h2 class="mb-1">{{ $candidature->name }}</h2>
                                                <div class="mb-3">
                                                    <div class="badge badge-warning">
                                                        <i class="fas fa-clock mr-1"></i>
                                                        {{ $candidature->status}}
                                                    </div>
                                                    
                                                </div>
                                                <div class="text-muted">
                                                    <i class="fas fa-calendar-alt mr-1"></i>
                                                    Soumise le {{ $candidature->created_at->format('d M Y') }}  
                                                    <span class="mx-2">•</span>
                                                    <i class="fas fa-building mr-1"></i>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
   

                <!-- APPLICATION DETAILS -->
                <div class="row mt-4">
                    <!-- LEFT COLUMN -->
                    <div class="col-lg-12">
                        <!-- PERSONAL INFORMATION -->
                        <div class="card">
                            <div class="card-header">
                                <h4>
                                    <i class="fas fa-user mr-2 text-primary"></i>
                                Documents joints
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Curriculum Vitae</label>
                                        <a href="{{ asset('storage/' . $candidature->cv) }}" target="_blank">Voir le CV</a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Diplôme</label>
                                        <a href="{{ asset('storage/' . $candidature->diplome) }}" target="_blank">Voir le diplome</a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Attestations</label>
                                        <a href="{{ asset('storage/' . $candidature->attestations) }}" target="_blank">Voir les attestations</a>
                                    </div>
                                     <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Relevé d'identité bancaire</label>
                                        <a href="{{ asset('storage/' . $candidature->rib) }}" target="_blank">Voir le relevé</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <!-- EDUCATION -->
                       
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- DELETE MODAL -->
    <div class="modal fade" tabindex="-1" role="dialog" id="deleteModal">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmer la suppression</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Êtes-vous sûr de vouloir supprimer cette candidature ? Cette action est irréversible.</p>
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        Attention : Tous les documents associés seront également supprimés.
                    </div>
                </div>
                <div class="modal-footer bg-whitesmoke br">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-danger">Supprimer définitivement</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
<style>
    .card-hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .card-hero .card-header h4,
    .card-hero .card-body h2 {
        color: white !important;
    }
    
    .card-hero .text-muted {
        color: rgba(255, 255, 255, 0.8) !important;
    }
    
    .avatar-lg {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .activities .activity {
        display: flex;
        position: relative;
        padding-left: 70px;
        margin-bottom: 30px;
    }
    
    .activities .activity:before {
        content: '';
        position: absolute;
        left: 30px;
        top: 0;
        bottom: -30px;
        width: 2px;
        background-color: #e3e6f0;
    }
    
    .activities .activity:last-child:before {
        display: none;
    }
    
    .activity-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        z-index: 1;
    }
    
    .activity-detail {
        padding-top: 10px;
    }
    
    .text-job {
        font-size: 0.85rem;
        color: #6c757d;
    }
    
    .bullet {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: #6c757d;
        border-radius: 50%;
        margin: 0 10px;
        vertical-align: middle;
    }
    
    .media-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .list-unstyled-border .media {
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    
    .list-unstyled-border .media:last-child {
        border-bottom: none;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    
    .dropdown-divider {
        margin: 20px 0;
    }
    
    .display-4 {
        font-size: 3.5rem;
        font-weight: 300;
        line-height: 1.2;
    }
    
    .stars {
        font-size: 1.5rem;
    }
    
    .progress[data-height] {
        height: 10px !important;
    }
    
    .form-group p {
        padding: 8px 0;
        margin-bottom: 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .btn-group .btn {
        padding: 8px 15px;
    }
</style>
@endpush

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Document download tracking
        const downloadButtons = document.querySelectorAll('a[href*="download"]');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const fileName = this.closest('.media').querySelector('h6').textContent;
                console.log(`Document téléchargé : ${fileName}`);
                // Ici vous pourriez envoyer une requête AJAX pour tracker le téléchargement
            });
        });

        // Status progress animation
        const progressBar = document.querySelector('.progress-bar[data-width="60%"]');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = '60%';
                progressBar.style.transition = 'width 1s ease-in-out';
            }, 500);
        }

        // Score breakdown animation
        const scoreBars = document.querySelectorAll('.progress-bar[data-width]');
        scoreBars.forEach(bar => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.style.transition = 'width 1s ease-in-out';
            }, 800);
        });

        // Delete modal
        const deleteModal = document.getElementById('deleteModal');
        if (deleteModal) {
            deleteModal.addEventListener('show.bs.modal', function (event) {
                // Logique supplémentaire pour la suppression
            });
        }

        // Tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Contact buttons
        const contactBtn = document.querySelector('.btn[data-target="#contactModal"]');
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                alert('Fonctionnalité de contact à implémenter');
            });
        }

        // Timeline scroll
        const activities = document.querySelector('.activities');
        if (activities) {
            activities.scrollTop = activities.scrollHeight;
        }

        // Score stars hover effect
        const stars = document.querySelectorAll('.stars .fa-star');
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', function() {
                // Highlight stars on hover
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add('text-warning');
                    stars[i].classList.remove('far');
                    stars[i].classList.add('fas');
                }
            });

            star.addEventListener('mouseout', function() {
                // Reset stars (only first 4 filled)
                stars.forEach((s, i) => {
                    if (i < 4) {
                        s.classList.add('text-warning', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.add('far');
                        s.classList.remove('fas');
                    }
                });
            });
        });
    });
</script>
@endpush