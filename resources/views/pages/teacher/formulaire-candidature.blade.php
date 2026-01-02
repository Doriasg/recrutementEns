
@extends('layouts.teacher')

@section('title', 'INSTI - Formulaire de Candidature')

@section('content')
    <!-- MAIN CONTENT -->
    <div class="main-wrapper">
        <!-- HERO HEADER -->
        <section class="hero-header">
            <h1>Formulaire de Candidature</h1>
            <p>Enseignant en Génie Électrique</p>
            <div class="offer-badge">
                <i class="fas fa-hashtag"></i> Référence : INSTI-2025-GE-001
            </div>
        </section>

        <!-- FORM CARD -->
        <main class="form-card">
            <!-- PROGRESS -->
            <div class="progress-container">
                <div class="progress-text">
                    <span>Progression de la candidature</span>
                    <span id="progressText">Étape 1 sur 4</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>

            <!-- STEPPER -->
            <nav class="stepper">
                <div class="step active" data-step="1">
                    <div class="circle">1</div>
                    <span class="label">Informations personnelles</span>
                </div>
                <div class="line"></div>
                <div class="step" data-step="2">
                    <div class="circle">2</div>
                    <span class="label">Formation</span>
                </div>
                <div class="line"></div>
                <div class="step" data-step="3">
                    <div class="circle">3</div>
                    <span class="label">Expérience</span>
                </div>
                <div class="line"></div>
                <div class="step" data-step="4">
                    <div class="circle">4</div>
                    <span class="label">Documents</span>
                </div>
            </nav>

            <!-- FORM -->
            <form id="candidatureForm" action="{{ route('teacher.application.submit') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="offer_id" value="{{ request('offer_id', 1) }}">
                
                <!-- ÉTAPE 1: INFORMATIONS PERSONNELLES -->
                <section class="form-section active" id="step1">
                    <div class="section-block">
                        <h2 class="section-title">
                            <span class="icon">👤</span> Informations personnelles
                        </h2>
                        <div class="input-grid">
                            <div class="field">
                                <label class="required">Nom</label>
                                <input type="text" name="nom" value="{{ Auth::user()->last_name ?? 'ADJOVI' }}" placeholder="Votre nom" required>
                                <div class="error-message"></div>
                            </div>
                            <div class="field">
                                <label class="required">Prénom</label>
                                <input type="text" name="prenom" value="{{ Auth::user()->first_name ?? 'Jean Pierre' }}" placeholder="Vos prénoms" required>
                                <div class="error-message"></div>
                            </div>
                            <div class="field">
                                <label class="required">Date de naissance</label>
                                <div class="input-with-icon">
                                    <input type="date" name="date_naissance" value="1985-05-19" required>
                                    <span class="calendar-icon"><i class="fas fa-calendar-alt"></i></span>
                                </div>
                                <div class="error-message"></div>
                            </div>
                            <div class="field">
                                <label class="required">Nationalité</label>
                                <input type="text" name="nationalite" value="Béninoise" placeholder="Votre nationalité" required>
                                <div class="error-message"></div>
                            </div>
                            <div class="field">
                                <label class="required">Email</label>
                                <input type="email" name="email" value="{{ Auth::user()->email ?? 'jeanadjovi@gmail.com' }}" placeholder="votre.email@exemple.com" required>
                                <div class="error-message"></div>
                            </div>
                            <div class="field">
                                <label class="required">Téléphone</label>
                                <input type="tel" name="telephone" value="+229 01 92 45 78 63" placeholder="+229 XX XX XX XX" required>
                                <div class="error-message"></div>
                            </div>
                            <div class="field full-width">
                                <label class="required">Adresse Complète</label>
                                <input type="text" name="adresse" value="Quartier Gbegamey, Rue 123, Cotonou, Bénin" placeholder="Votre adresse complète" required>
                                <div class="error-message"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ÉTAPE 2: FORMATION -->
                <section class="form-section" id="step2">
                    <div class="section-block grey-card">
                        <div class="section-header">
                            <h2 class="section-title">
                                <span class="icon">🎓</span> Formation Académique
                            </h2>
                            <button type="button" class="add-link" id="addFormation">
                                <i class="fas fa-plus"></i>
                                Ajouter une formation
                            </button>
                        </div>
                        <div id="formationsContainer">
                            <!-- Formation 1 -->
                            <div class="sub-container">
                                <p class="sub-label">
                                    Formation 1
                                    <button type="button" class="remove-btn" onclick="this.closest('.sub-container').remove(); updateFormationNumbers();">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </p>
                                <div class="input-grid">
                                    <div class="field">
                                        <label class="required">Diplôme</label>
                                        <select name="diplome[]" required>
                                            <option value="">Sélectionner</option>
                                            <option value="doctorat" selected>Doctorat (PhD)</option>
                                            <option value="master">Master</option>
                                            <option value="licence">Licence</option>
                                            <option value="ingenieur">Diplôme d'Ingénieur</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                        <div class="error-message"></div>
                                    </div>
                                    <div class="field">
                                        <label class="required">Spécialité</label>
                                        <input type="text" name="specialite[]" value="Génie Électrique" placeholder="Ex: Génie Électrique" required>
                                        <div class="error-message"></div>
                                    </div>
                                    <div class="field">
                                        <label class="required">Établissement</label>
                                        <input type="text" name="etablissement[]" value="Université d'Abomey-Calavi, Bénin" placeholder="Nom de l'établissement" required>
                                        <div class="error-message"></div>
                                    </div>
                                    <div class="field">
                                        <label class="required">Année d'obtention</label>
                                        <input type="number" name="annee_obtention[]" value="2019" min="1970" max="2024" placeholder="2020" required>
                                        <div class="error-message"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ÉTAPE 3: EXPÉRIENCE -->
                <section class="form-section" id="step3">
                    <div class="section-block grey-card">
                        <div class="section-header">
                            <h2 class="section-title">
                                <span class="icon">📑</span> Expérience professionnelle
                            </h2>
                            <button type="button" class="add-link" id="addExperience">
                                <i class="fas fa-plus"></i>
                                Ajouter une expérience
                            </button>
                        </div>
                        <div id="experiencesContainer">
                            <!-- Expérience 1 -->
                            <div class="sub-container">
                                <p class="sub-label">
                                    Expérience 1
                                    <button type="button" class="remove-btn" onclick="this.closest('.sub-container').remove(); updateExperienceNumbers();">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </p>
                                <div class="input-grid">
                                    <div class="field full-width">
                                        <label class="required">Poste occupé</label>
                                        <input type="text" name="poste[]" value="Enseignant-Chercheur" placeholder="Ex: Enseignant-Chercheur" required>
                                        <div class="error-message"></div>
                                    </div>
                                    <div class="field full-width">
                                        <label class="required">Établissement/Entreprise</label>
                                        <input type="text" name="entreprise[]" value="Université de Parakou, Bénin" placeholder="Nom de l'établissement" required>
                                        <div class="error-message"></div>
                                    </div>
                                    <div class="field">
                                        <label class="required">Date de début</label>
                                        <input type="month" name="date_debut[]" value="2019-09" required>
                                        <div class="error-message"></div>
                                    </div>
                                    <div class="field">
                                        <label>Date de fin</label>
                                        <input type="month" name="date_fin[]">
                                        <div class="error-message"></div>
                                    </div>
                                    <div class="field full-width">
                                        <label class="required">Description des tâches</label>
                                        <textarea name="description[]" placeholder="Description des tâches" rows="3" required>Enseignement des cours de circuits électriques, électronique de puissance et automatique. Encadrement de mémoires de licence et master.</textarea>
                                        <div class="error-message"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ÉTAPE 4: DOCUMENTS -->
                <section class="form-section" id="step4">
                    <div class="section-block grey-card last-section">
                        <h2 class="section-title">
                            <span class="icon">📁</span> Documents à joindre
                        </h2>

                        <div class="upload-section">
                            <div class="upload-placeholder" id="uploadArea">
                                <p><i class="fas fa-cloud-upload-alt fa-2x"></i></p>
                                <p>Cliquez ou glissez vos documents ici</p>
                                <p class="upload-hint">Formats acceptés : PDF, DOC, DOCX, JPG, PNG (max. 10MB par fichier)</p>
                                <input type="file" name="documents[]" multiple style="display: none;" id="fileInput">
                            </div>

                            <div class="file-list" id="fileList">
                                <p class="upload-hint">Aucun fichier téléchargé</p>
                            </div>
                        </div>

                        <div class="document-checklist" style="margin-top: 30px;">
                            <h3 style="font-size: 16px; margin-bottom: 15px; color: var(--blue-primary);">
                                <i class="fas fa-check-circle"></i> Liste des documents requis :
                            </h3>
                            <ul style="list-style: none; padding-left: 0; color: var(--text-light);">
                                <li style="padding: 5px 0;"><i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> Curriculum vitae détaillé</li>
                                <li style="padding: 5px 0;"><i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> Lettre de motivation</li>
                                <li style="padding: 5px 0;"><i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> Copies certifiées des diplômes</li>
                                <li style="padding: 5px 0;"><i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> Attestations de travail</li>
                                <li style="padding: 5px 0;"><i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> Liste des publications</li>
                                <li style="padding: 5px 0;"><i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> Lettres de recommandation</li>
                                <li style="padding: 5px 0;"><i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> Pièce d'identité</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- FORM NAVIGATION -->
                <div class="form-navigation">
                    <button type="button" class="nav-btn btn-prev" id="prevBtn">
                        <i class="fas fa-arrow-left"></i>
                        Précédent
                    </button>

                    <button type="button" class="nav-btn btn-next" id="nextBtn">
                        Suivant
                        <i class="fas fa-arrow-right"></i>
                    </button>

                    <button type="submit" class="nav-btn btn-submit" id="submitBtn" style="display: none;">
                        <i class="fas fa-paper-plane"></i>
                        Soumettre ma candidature
                    </button>
                </div>
            </form>
        </main>
    </div>

    <!-- SUCCESS MODAL -->
    <div class="modal-overlay" id="successModal">
        <div class="success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Candidature Soumise avec Succès !</h3>
            <p>Votre candidature pour le poste d'Enseignant en Génie Électrique a été enregistrée. Vous recevrez un email de confirmation et serez notifié des prochaines étapes du processus de recrutement.</p>
            <div class="modal-buttons">
                <button class="nav-btn btn-prev" id="modalClose">
                    Fermer
                </button>
                <button class="nav-btn btn-submit" id="modalDashboard">
                    <i class="fas fa-tachometer-alt"></i>
                    Voir mon tableau de bord
                </button>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script src="{{ asset('js/pages/teacher/formulaire-candidature.js') }}"></script>
<script>
    // Multi-step form functionality
    document.addEventListener('DOMContentLoaded', function() {
        const steps = document.querySelectorAll('.step');
        const formSections = document.querySelectorAll('.form-section');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        let currentStep = 1;

        function updateProgress() {
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            const progressText = document.getElementById('progressText');
            const progressPercentage = (currentStep / 4) * 100;
            
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `Étape ${currentStep} sur 4`;

            // Update stepper
            steps.forEach((step, index) => {
                if (index + 1 === currentStep) {
                    step.classList.add('active');
                } else if (index + 1 < currentStep) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });

            // Show/hide form sections
            formSections.forEach((section, index) => {
                if (index + 1 === currentStep) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Show/hide buttons
            prevBtn.style.display = currentStep === 1 ? 'none' : 'flex';
            nextBtn.style.display = currentStep === 4 ? 'none' : 'flex';
            submitBtn.style.display = currentStep === 4 ? 'flex' : 'none';
        }

        // Navigation buttons
        nextBtn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                updateProgress();
            }
        });

        prevBtn.addEventListener('click', function() {
            currentStep--;
            updateProgress();
        });

        // Add formation
        document.getElementById('addFormation')?.addEventListener('click', function() {
            const container = document.getElementById('formationsContainer');
            const count = container.children.length + 1;
            
            const newFormation = `
                <div class="sub-container">
                    <p class="sub-label">
                        Formation ${count}
                        <button type="button" class="remove-btn" onclick="this.closest('.sub-container').remove(); updateFormationNumbers();">
                            <i class="fas fa-times"></i>
                        </button>
                    </p>
                    <div class="input-grid">
                        <div class="field">
                            <label class="required">Diplôme</label>
                            <select name="diplome[]" required>
                                <option value="">Sélectionner</option>
                                <option value="doctorat">Doctorat (PhD)</option>
                                <option value="master">Master</option>
                                <option value="licence">Licence</option>
                                <option value="ingenieur">Diplôme d'Ingénieur</option>
                                <option value="autre">Autre</option>
                            </select>
                            <div class="error-message"></div>
                        </div>
                        <div class="field">
                            <label class="required">Spécialité</label>
                            <input type="text" name="specialite[]" placeholder="Ex: Génie Électrique" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="field">
                            <label class="required">Établissement</label>
                            <input type="text" name="etablissement[]" placeholder="Nom de l'établissement" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="field">
                            <label class="required">Année d'obtention</label>
                            <input type="number" name="annee_obtention[]" min="1970" max="2024" placeholder="2020" required>
                            <div class="error-message"></div>
                        </div>
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', newFormation);
        });

        // Add experience
        document.getElementById('addExperience')?.addEventListener('click', function() {
            const container = document.getElementById('experiencesContainer');
            const count = container.children.length + 1;
            
            const newExperience = `
                <div class="sub-container">
                    <p class="sub-label">
                        Expérience ${count}
                        <button type="button" class="remove-btn" onclick="this.closest('.sub-container').remove(); updateExperienceNumbers();">
                            <i class="fas fa-times"></i>
                        </button>
                    </p>
                    <div class="input-grid">
                        <div class="field full-width">
                            <label class="required">Poste occupé</label>
                            <input type="text" name="poste[]" placeholder="Ex: Enseignant-Chercheur" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="field full-width">
                            <label class="required">Établissement/Entreprise</label>
                            <input type="text" name="entreprise[]" placeholder="Nom de l'établissement" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="field">
                            <label class="required">Date de début</label>
                            <input type="month" name="date_debut[]" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="field">
                            <label>Date de fin</label>
                            <input type="month" name="date_fin[]">
                            <div class="error-message"></div>
                        </div>
                        <div class="field full-width">
                            <label class="required">Description des tâches</label>
                            <textarea name="description[]" placeholder="Description des tâches" rows="3" required></textarea>
                            <div class="error-message"></div>
                        </div>
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', newExperience);
        });

        // File upload
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#0a3f8f';
                uploadArea.style.background = 'rgba(10, 63, 143, 0.02)';
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = '';
                uploadArea.style.background = '';
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '';
                uploadArea.style.background = '';
                if (e.dataTransfer.files.length) {
                    handleFiles(e.dataTransfer.files);
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) {
                    handleFiles(e.target.files);
                }
            });
        }

        function handleFiles(files) {
            fileList.innerHTML = '';
            Array.from(files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <div class="file-info">
                        <div class="file-icon">
                            <i class="fas fa-file-${file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'word'}"></i>
                        </div>
                        <div>
                            <div class="file-name">${file.name}</div>
                            <div class="file-size">${(file.size / (1024 * 1024)).toFixed(2)}MB</div>
                        </div>
                    </div>
                    <div class="file-remove" onclick="this.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </div>
                `;
                fileList.appendChild(fileItem);
            });
        }

        // Form submission
        const form = document.getElementById('candidatureForm');
        const successModal = document.getElementById('successModal');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success modal
            successModal.classList.add('show');
            
            // In a real app, this would be an AJAX submission
            setTimeout(() => {
                // Submit form after showing success message
                this.submit();
            }, 3000);
        });

        // Modal buttons
        document.getElementById('modalClose')?.addEventListener('click', function() {
            successModal.classList.remove('show');
        });

        document.getElementById('modalDashboard')?.addEventListener('click', function() {
            window.location.href = "{{ route('teacher.dashboard') }}";
        });

        // Initialize
        updateProgress();
    });

    // Validation function
    function validateStep(step) {
        let isValid = true;
        const currentSection = document.getElementById(`step${step}`);
        const inputs = currentSection.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            const field = input.closest('.field');
            const errorMessage = field.querySelector('.error-message');
            
            if (!input.value.trim()) {
                field.classList.add('error');
                errorMessage.textContent = 'Ce champ est obligatoire';
                errorMessage.style.display = 'block';
                isValid = false;
            } else {
                field.classList.remove('error');
                errorMessage.style.display = 'none';
                
                // Additional validations
                if (input.type === 'email' && !isValidEmail(input.value)) {
                    field.classList.add('error');
                    errorMessage.textContent = 'Email invalide';
                    errorMessage.style.display = 'block';
                    isValid = false;
                }
                
                if (input.type === 'tel' && !isValidPhone(input.value)) {
                    field.classList.add('error');
                    errorMessage.textContent = 'Numéro de téléphone invalide';
                    errorMessage.style.display = 'block';
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return re.test(phone);
    }

    // Update numbers for removed items
    function updateFormationNumbers() {
        const formations = document.querySelectorAll('#formationsContainer .sub-container');
        formations.forEach((formation, index) => {
            const label = formation.querySelector('.sub-label');
            label.firstChild.textContent = `Formation ${index + 1} `;
        });
    }

    function updateExperienceNumbers() {
        const experiences = document.querySelectorAll('#experiencesContainer .sub-container');
        experiences.forEach((experience, index) => {
            const label = experience.querySelector('.sub-label');
            label.firstChild.textContent = `Expérience ${index + 1} `;
        });
    }
</script>
@endpush
