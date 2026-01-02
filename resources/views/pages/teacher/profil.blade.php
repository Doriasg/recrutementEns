@extends('layouts.teacher')

@section('title', 'INSTI - Mon Profil')

@section('content')
    <!-- PROFILE HEADER -->
    <div class="profile-header">
        <div class="header-container">
            <div class="header-content">
                <div class="header-text">
                    <h1>Mon Profil</h1>
                    <p>Gérez vos informations personnelles et professionnelles</p>
                </div>
                <button class="btn-edit" id="editProfileBtn">
                    <i class="fas fa-edit"></i> Modifier le profil
                </button>
            </div>
        </div>
    </div>

    <!-- MAIN CONTENT -->
    <main class="container">
        <!-- SIDEBAR -->
        <aside class="sidebar">
            <!-- PROFILE CARD -->
            <div class="card profile-card">
                <div class="avatar">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <h2>Dr. {{ Auth::user()->name ?? 'ADJOVI Jean' }}</h2>
                <p class="subtitle">Candidat enseignant</p>
                <div class="progress-tag">
                    <i class="fas fa-chart-line"></i> Profil complété à 85%
                </div>
            </div>

            <!-- STATS CARD -->
            <div class="card stats-card">
                <h3><i class="fas fa-chart-bar"></i> Statistiques</h3>
                <ul>
                    <li>
                        <span>Candidatures actives</span>
                        <strong>3</strong>
                    </li>
                    <li>
                        <span>Documents uploadés</span>
                        <strong>7</strong>
                    </li>
                    <li>
                        <span>Membre depuis</span>
                        <strong>Nov 2024</strong>
                    </li>
                </ul>
            </div>
        </aside>

        <!-- MAIN CONTENT -->
        <section class="main-content">
            <!-- INFORMATIONS PERSONNELLES -->
            <div class="card form-section" id="personalInfoSection">
                <h3><i class="fas fa-user-circle"></i> Informations personnelles</h3>

                <!-- View Mode -->
                <div class="grid-form" id="viewMode">
                    <div class="form-group">
                        <label>Nom</label>
                        <div class="input-field bold">ADJOVI</div>
                    </div>
                    <div class="form-group">
                        <label>Prénom</label>
                        <div class="input-field">Jean Pierre</div>
                    </div>
                    <div class="form-group">
                        <label>Date de naissance</label>
                        <div class="input-field">19 Mai 1985</div>
                    </div>
                    <div class="form-group">
                        <label>Nationalité</label>
                        <div class="input-field">Béninoise</div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <div class="input-field">{{ Auth::user()->email ?? 'jeanadjovi@gmail.com' }}</div>
                    </div>
                    <div class="form-group">
                        <label>Téléphone</label>
                        <div class="input-field">+229 01 92 45 78 63</div>
                    </div>
                    <div class="form-group full-width">
                        <label>Adresse Complète</label>
                        <div class="input-field">Quartier Gbegamey, Rue 123, Cotonou, Bénin</div>
                    </div>
                </div>

                <!-- Edit Mode (Hidden by default) -->
                <form id="editForm" style="display: none;" action="{{ route('teacher.profile.update') }}" method="POST">
                    @csrf
                    @method('PUT')
                    
                    <div class="grid-form">
                        <div class="form-group">
                            <label for="edit_nom">Nom <span class="required">*</span></label>
                            <input type="text" id="edit_nom" name="last_name" class="input-field" value="ADJOVI" required>
                        </div>
                        <div class="form-group">
                            <label for="edit_prenom">Prénom <span class="required">*</span></label>
                            <input type="text" id="edit_prenom" name="first_name" class="input-field" value="Jean Pierre" required>
                        </div>
                        <div class="form-group">
                            <label for="edit_date_naissance">Date de naissance</label>
                            <input type="date" id="edit_date_naissance" name="birth_date" class="input-field" value="1985-05-19">
                        </div>
                        <div class="form-group">
                            <label for="edit_nationalite">Nationalité</label>
                            <input type="text" id="edit_nationalite" name="nationality" class="input-field" value="Béninoise">
                        </div>
                        <div class="form-group">
                            <label for="edit_email">Email <span class="required">*</span></label>
                            <input type="email" id="edit_email" name="email" class="input-field" value="{{ Auth::user()->email ?? 'jeanadjovi@gmail.com' }}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit_telephone">Téléphone</label>
                            <input type="tel" id="edit_telephone" name="phone" class="input-field" value="+2290192457863">
                        </div>
                        <div class="form-group full-width">
                            <label for="edit_adresse">Adresse Complète</label>
                            <textarea id="edit_adresse" name="address" class="input-field" rows="2">Quartier Gbegamey, Rue 123, Cotonou, Bénin</textarea>
                        </div>

                        <div class="form-group full-width" style="margin-top: 20px; display: flex; gap: 15px; justify-content: flex-end;">
                            <button type="button" class="btn-cancel" id="cancelEditBtn">Annuler</button>
                            <button type="submit" class="btn-save">Enregistrer les modifications</button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- FORMATION ACADEMIQUE -->
            <div class="card info-section">
                <h3><i class="fas fa-graduation-cap"></i> Formation Académique</h3>

                <div class="timeline-item">
                    <h4>Doctorat (PhD) en Génie Électrique</h4>
                    <p>Université d'Abomey-Calavi, Bénin</p>
                    <span class="date">2015-2019</span>
                </div>
                <div class="timeline-item">
                    <h4>Master en Système Électrique</h4>
                    <p>École Polytechnique de Dakar, Sénégal</p>
                    <span class="date">2013-2015</span>
                </div>
                <div class="timeline-item">
                    <h4>Licence en Physique</h4>
                    <p>Université d'Abomey-Calavi, Bénin</p>
                    <span class="date">2010-2013</span>
                </div>

                <button class="add-item-btn" id="addEducationBtn">
                    <i class="fas fa-plus"></i> Ajouter une formation
                </button>
            </div>

            <!-- EXPERIENCE PROFESSIONNELLE -->
            <div class="card info-section">
                <h3><i class="fas fa-briefcase"></i> Expérience Professionnelle</h3>

                <div class="timeline-item">
                    <h4>Enseignant-Chercheur</h4>
                    <p>Université de Parakou, Bénin</p>
                    <span class="date">2019 - Présent (5 ans)</span>
                    <p class="desc">Enseignement des cours de circuits électriques, électronique de puissance et automatique. Encadrement de mémoires de licence et master.</p>
                </div>

                <button class="add-item-btn" id="addExperienceBtn">
                    <i class="fas fa-plus"></i> Ajouter une expérience
                </button>
            </div>

            <!-- DOCUMENTS -->
            <div class="card docs-section">
                <h3><i class="fas fa-file-lines"></i> Mes Documents</h3>

                <div class="doc-list">
                    <div class="doc-item">
                        <div class="doc-info">
                            <i class="fas fa-file-pdf"></i>
                            <div class="doc-content">
                                <p class="doc-name">CV_ADJOVI_Jean.pdf</p>
                                <div class="doc-meta">
                                    <span>2.4MB</span>
                                    <span>01 Déc 2024</span>
                                    <span class="status-badge status-active">Validé</span>
                                </div>
                            </div>
                        </div>
                        <div class="doc-actions">
                            <a href="#" target="_blank">Voir</a>
                            <a href="#" class="download">Télécharger</a>
                        </div>
                    </div>

                    <div class="doc-item">
                        <div class="doc-info">
                            <i class="fas fa-file-word"></i>
                            <div class="doc-content">
                                <p class="doc-name">Lettre_Motivation.docx</p>
                                <div class="doc-meta">
                                    <span>1.2MB</span>
                                    <span>30 Nov 2024</span>
                                    <span class="status-badge status-active">Validé</span>
                                </div>
                            </div>
                        </div>
                        <div class="doc-actions">
                            <a href="#" target="_blank">Voir</a>
                            <a href="#" class="download">Télécharger</a>
                        </div>
                    </div>

                    <div class="doc-item">
                        <div class="doc-info">
                            <i class="fas fa-file-image"></i>
                            <div class="doc-content">
                                <p class="doc-name">Diplome_Doctorat.jpg</p>
                                <div class="doc-meta">
                                    <span>3.8MB</span>
                                    <span>25 Nov 2024</span>
                                    <span class="status-badge status-pending">En attente</span>
                                </div>
                            </div>
                        </div>
                        <div class="doc-actions">
                            <a href="#" target="_blank">Voir</a>
                            <a href="#" class="download">Télécharger</a>
                        </div>
                    </div>
                </div>

                <button class="add-doc-btn" id="addDocumentBtn">
                    <i class="fas fa-cloud-upload-alt"></i> Ajouter un document
                </button>
            </div>
        </section>
    </main>
@endsection

@push('scripts')
<script>
    // Gestion du mode édition du profil
    const editProfileBtn = document.getElementById('editProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const viewMode = document.getElementById('viewMode');
    const editForm = document.getElementById('editForm');
    const personalInfoSection = document.getElementById('personalInfoSection');

    if (editProfileBtn && viewMode && editForm) {
        editProfileBtn.addEventListener('click', () => {
            if (viewMode.style.display === 'none') {
                // Retour au mode visualisation
                viewMode.style.display = 'grid';
                editForm.style.display = 'none';
                personalInfoSection.classList.remove('edit-mode');
                editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Modifier le profil';
                editProfileBtn.style.background = '';
                editProfileBtn.style.color = '';
            } else {
                // Passage en mode édition
                viewMode.style.display = 'none';
                editForm.style.display = 'block';
                personalInfoSection.classList.add('edit-mode');
                editProfileBtn.innerHTML = '<i class="fas fa-times"></i> Annuler la modification';
                editProfileBtn.style.background = '#f8f9fa';
                editProfileBtn.style.color = '#666';
            }
        });

        if (cancelEditBtn) {
            cancelEditBtn.addEventListener('click', () => {
                viewMode.style.display = 'grid';
                editForm.style.display = 'none';
                personalInfoSection.classList.remove('edit-mode');
                editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Modifier le profil';
                editProfileBtn.style.background = '';
                editProfileBtn.style.color = '';
            });
        }

        // Gestion de la soumission du formulaire
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this would be an AJAX call
            alert('Profil mis à jour avec succès !');
            viewMode.style.display = 'grid';
            editForm.style.display = 'none';
            personalInfoSection.classList.remove('edit-mode');
            editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Modifier le profil';
            editProfileBtn.style.background = '';
            editProfileBtn.style.color = '';
        });
    }

    // Gestion des boutons d'ajout
    document.getElementById('addEducationBtn')?.addEventListener('click', function() {
        alert('Fonctionnalité d\'ajout de formation en cours de développement !');
    });

    document.getElementById('addExperienceBtn')?.addEventListener('click', function() {
        alert('Fonctionnalité d\'ajout d\'expérience en cours de développement !');
    });

    document.getElementById('addDocumentBtn')?.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
        input.multiple = true;

        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                alert(`${this.files.length} document(s) sélectionné(s) - Fonctionnalité d'upload en cours de développement !`);
            }
        });

        input.click();
    });

    // Gestion des actions sur les documents
    document.querySelectorAll('.doc-actions a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('download')) {
                e.preventDefault();
                alert('Visualisation du document - Fonctionnalité en cours de développement !');
            }
        });
    });
</script>
@endpush
