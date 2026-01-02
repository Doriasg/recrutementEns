/**
 * Page Profil - INSTI Plateforme
 * Gestion du profil enseignant
 */

document.addEventListener('DOMContentLoaded', function() {
    initProfilePage();
});

function initProfilePage() {
    // Initialisation du mode édition
    initEditMode();
    
    // Initialisation des formulaires
    initProfileForms();
    
    // Initialisation des sections
    initProfileSections();
    
    // Initialisation des téléchargements
    initDocumentDownloads();
    
    // Initialisation des ajouts dynamiques
    initDynamicAdditions();
    
    // Initialisation de la barre de progression
    initProfileProgress();
    
    // Initialisation du téléchargement d'image
    initProfileImageUpload();
    
    // Charger les données du profil
    loadProfileData();
}

/**
 * Initialisation du mode édition
 */
function initEditMode() {
    const editBtn = document.getElementById('editProfileBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const viewMode = document.getElementById('viewMode');
    const editForm = document.getElementById('editForm');
    
    if (!editBtn || !viewMode || !editForm) return;
    
    editBtn.addEventListener('click', toggleEditMode);
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            toggleEditMode(false);
        });
    }
    
    // Gérer la soumission du formulaire
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileChanges();
    });
}

/**
 * Basculer le mode édition
 */
function toggleEditMode(forceShow) {
    const viewMode = document.getElementById('viewMode');
    const editForm = document.getElementById('editForm');
    const editBtn = document.getElementById('editProfileBtn');
    const personalInfoSection = document.getElementById('personalInfoSection');
    
    if (!viewMode || !editForm || !editBtn) return;
    
    const isEditing = forceShow !== undefined ? forceShow : viewMode.style.display !== 'none';
    
    if (isEditing) {
        // Passer en mode édition
        viewMode.style.display = 'none';
        editForm.style.display = 'block';
        personalInfoSection?.classList.add('edit-mode');
        
        editBtn.innerHTML = '<i class="fas fa-times"></i> Annuler';
        editBtn.classList.add('editing');
        
        // Focus sur le premier champ
        const firstInput = editForm.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
    } else {
        // Revenir en mode visualisation
        viewMode.style.display = 'grid';
        editForm.style.display = 'none';
        personalInfoSection?.classList.remove('edit-mode');
        
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Modifier le profil';
        editBtn.classList.remove('editing');
        
        // Réinitialiser le formulaire
        resetEditForm();
    }
}

/**
 * Réinitialiser le formulaire d'édition
 */
function resetEditForm() {
    const editForm = document.getElementById('editForm');
    if (!editForm) return;
    
    // Réinitialiser les valeurs aux données actuelles
    const viewMode = document.getElementById('viewMode');
    if (viewMode) {
        // Récupérer les valeurs d'affichage
        const currentValues = {
            nom: viewMode.querySelector('[data-field="nom"]')?.textContent || '',
            prenom: viewMode.querySelector('[data-field="prenom"]')?.textContent || '',
            // ... autres champs
        };
        
        // Appliquer aux champs de formulaire
        Object.entries(currentValues).forEach(([field, value]) => {
            const input = editForm.querySelector(`[name="${field}"]`);
            if (input) input.value = value;
        });
    }
    
    // Effacer les erreurs
    clearFormErrors(editForm);
}

/**
 * Effacer les erreurs d'un formulaire
 */
function clearFormErrors(form) {
    form.querySelectorAll('.has-error').forEach(el => {
        el.classList.remove('has-error');
        const error = el.querySelector('.error-message');
        if (error) error.remove();
    });
}

/**
 * Sauvegarder les modifications du profil
 */
function saveProfileChanges() {
    const form = document.getElementById('editForm');
    if (!form) return;
    
    // Valider le formulaire
    if (!validateProfileForm(form)) {
        return;
    }
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Afficher le chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sauvegarde...';
    
    // Simulation d'envoi
    setTimeout(() => {
        // Simuler une réponse du serveur
        const mockResponse = {
            success: true,
            message: 'Profil mis à jour avec succès'
        };
        
        if (mockResponse.success) {
            // Mettre à jour l'affichage
            updateProfileDisplay(formData);
            
            // Afficher un message de succès
            window.INSTI?.showToast(mockResponse.message, 'success');
            
            // Revenir en mode visualisation
            toggleEditMode(false);
            
            // Mettre à jour la barre de progression
            updateProfileProgress();
        } else {
            // Afficher une erreur
            window.INSTI?.showToast(mockResponse.message, 'error');
        }
        
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 2000);
}

/**
 * Valider le formulaire de profil
 */
function validateProfileForm(form) {
    let isValid = true;
    
    // Réinitialiser les erreurs
    clearFormErrors(form);
    
    // Validation des champs requis
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFormError(field, 'Ce champ est obligatoire');
            isValid = false;
        }
    });
    
    // Validation de l'email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        if (!window.INSTI?.isValidEmail(emailField.value)) {
            showFormError(emailField, 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
    }
    
    // Validation du téléphone
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim()) {
        if (!window.INSTI?.isValidPhone(phoneField.value)) {
            showFormError(phoneField, 'Veuillez entrer un numéro de téléphone valide');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Afficher une erreur de formulaire
 */
function showFormError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.add('has-error');
    
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    
    field.focus();
}

/**
 * Mettre à jour l'affichage du profil
 */
function updateProfileDisplay(formData) {
    const viewMode = document.getElementById('viewMode');
    if (!viewMode) return;
    
    // Mettre à jour chaque champ
    formData.forEach((value, key) => {
        const displayElement = viewMode.querySelector(`[data-field="${key}"]`);
        if (displayElement) {
            displayElement.textContent = value;
        }
    });
    
    // Sauvegarder dans localStorage
    saveProfileToLocalStorage(formData);
}

/**
 * Sauvegarder le profil dans localStorage
 */
function saveProfileToLocalStorage(formData) {
    const profileData = {};
    
    formData.forEach((value, key) => {
        profileData[key] = value;
    });
    
    localStorage.setItem('insti_profile_data', JSON.stringify(profileData));
}

/**
 * Initialisation des formulaires
 */
function initProfileForms() {
    // Gestion des champs date
    initDateFields();
    
    // Gestion des sélecteurs
    initSelectFields();
    
    // Gestion des textarea
    initTextareaFields();
}

/**
 * Initialisation des champs date
 */
function initDateFields() {
    const dateFields = document.querySelectorAll('input[type="date"]');
    
    dateFields.forEach(field => {
        // Ajouter un calendrier visuel
        const wrapper = document.createElement('div');
        wrapper.className = 'date-field-wrapper';
        field.parentNode.insertBefore(wrapper, field);
        wrapper.appendChild(field);
        
        const calendarBtn = document.createElement('button');
        calendarBtn.type = 'button';
        calendarBtn.className = 'calendar-btn';
        calendarBtn.innerHTML = '<i class="fas fa-calendar-alt"></i>';
        wrapper.appendChild(calendarBtn);
        
        calendarBtn.addEventListener('click', function() {
            field.showPicker(); // Fonctionnalité moderne des navigateurs
        });
    });
}

/**
 * Initialisation des sélecteurs
 */
function initSelectFields() {
    const selectFields = document.querySelectorAll('select');
    
    selectFields.forEach(select => {
        // Ajouter une flèche personnalisée
        const wrapper = document.createElement('div');
        wrapper.className = 'select-wrapper';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        
        const arrow = document.createElement('div');
        arrow.className = 'select-arrow';
        arrow.innerHTML = '<i class="fas fa-chevron-down"></i>';
        wrapper.appendChild(arrow);
    });
}

/**
 * Initialisation des textarea
 */
function initTextareaFields() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        // Ajouter un compteur de caractères
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0/${textarea.maxLength || '∞'}`;
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.maxLength;
            
            counter.textContent = `${currentLength}${maxLength ? '/' + maxLength : ''}`;
            
            // Changer la couleur si proche de la limite
            if (maxLength && currentLength > maxLength * 0.8) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = '#64748b';
            }
        });
        
        // Déclencher l'événement input pour initialiser le compteur
        textarea.dispatchEvent(new Event('input'));
    });
}

/**
 * Initialisation des sections
 */
function initProfileSections() {
    const sections = document.querySelectorAll('.info-section, .docs-section');
    
    sections.forEach(section => {
        // Ajouter un bouton de dépliage
        const header = section.querySelector('h3');
        if (header) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'section-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
            header.appendChild(toggleBtn);
            
            toggleBtn.addEventListener('click', function() {
                const content = section.querySelector('.timeline-item, .doc-list');
                if (content) {
                    content.classList.toggle('collapsed');
                    
                    // Changer l'icône
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.className = content.classList.contains('collapsed') 
                            ? 'fas fa-chevron-right' 
                            : 'fas fa-chevron-down';
                    }
                }
            });
        }
    });
}

/**
 * Initialisation des téléchargements
 */
function initDocumentDownloads() {
    const downloadLinks = document.querySelectorAll('.doc-actions .download');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const docItem = this.closest('.doc-item');
            const docName = docItem.querySelector('.doc-name')?.textContent || 'document';
            const docSize = docItem.querySelector('.doc-meta span:first-child')?.textContent || '';
            
            // Simulation de téléchargement
            simulateDownload(docName, docSize);
        });
    });
    
    // Boutons "Voir"
    const viewLinks = document.querySelectorAll('.doc-actions a:not(.download)');
    viewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const docItem = this.closest('.doc-item');
            const docName = docItem.querySelector('.doc-name')?.textContent || 'document';
            
            // Ouvrir une visionneuse de document
            openDocumentViewer(docName);
        });
    });
}

/**
 * Simuler un téléchargement
 */
function simulateDownload(filename, size) {
    // Créer un lien de téléchargement fictif
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    
    // Simuler le clic
    link.click();
    
    // Afficher une notification
    window.INSTI?.showToast(`Téléchargement de ${filename} (${size})`, 'info');
}

/**
 * Ouvrir une visionneuse de document
 */
function openDocumentViewer(filename) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal document-viewer">
            <div class="modal-header">
                <h3>${filename}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="document-preview">
                    <div class="preview-placeholder">
                        <i class="fas fa-file-pdf fa-4x"></i>
                        <p>Aperçu du document</p>
                        <p class="preview-info">Cette fonctionnalité est en cours de développement</p>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="btn-primary">
                        <i class="fas fa-download"></i> Télécharger
                    </button>
                    <button class="btn-secondary">
                        <i class="fas fa-print"></i> Imprimer
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestion de la fermeture
    const closeModal = () => modal.remove();
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Gestion des actions
    modal.querySelector('.btn-primary').addEventListener('click', () => {
        simulateDownload(filename, '');
    });
    
    modal.querySelector('.btn-secondary').addEventListener('click', () => {
        window.print();
    });
}

/**
 * Initialisation des ajouts dynamiques
 */
function initDynamicAdditions() {
    // Bouton "Ajouter une formation"
    const addEducationBtn = document.getElementById('addEducationBtn');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', addEducationForm);
    }
    
    // Bouton "Ajouter une expérience"
    const addExperienceBtn = document.getElementById('addExperienceBtn');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', addExperienceForm);
    }
    
    // Bouton "Ajouter un document"
    const addDocumentBtn = document.getElementById('addDocumentBtn');
    if (addDocumentBtn) {
        addDocumentBtn.addEventListener('click', uploadDocument);
    }
}

/**
 * Ajouter un formulaire de formation
 */
function addEducationForm() {
    const educationSection = document.querySelector('.info-section:nth-child(2)');
    if (!educationSection) return;
    
    const timeline = educationSection.querySelector('.timeline-item:last-child');
    const newIndex = educationSection.querySelectorAll('.timeline-item').length + 1;
    
    const educationForm = document.createElement('div');
    educationForm.className = 'education-form active';
    educationForm.innerHTML = `
        <div class="form-header">
            <h4>Nouvelle formation</h4>
            <button class="btn-close-form">&times;</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Diplôme *</label>
                <select name="diploma" required>
                    <option value="">Sélectionner</option>
                    <option value="doctorat">Doctorat (PhD)</option>
                    <option value="master">Master</option>
                    <option value="licence">Licence</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
            <div class="form-group">
                <label>Spécialité *</label>
                <input type="text" name="specialty" placeholder="Ex: Génie Électrique" required>
            </div>
            <div class="form-group">
                <label>Établissement *</label>
                <input type="text" name="institution" placeholder="Nom de l'établissement" required>
            </div>
            <div class="form-group">
                <label>Année d'obtention *</label>
                <input type="number" name="year" min="1970" max="2024" required>
            </div>
            <div class="form-group full-width">
                <label>Description</label>
                <textarea name="description" rows="2" placeholder="Description complémentaire..."></textarea>
            </div>
        </div>
        <div class="form-actions">
            <button class="btn-secondary btn-cancel">Annuler</button>
            <button class="btn-primary btn-save">Enregistrer</button>
        </div>
    `;
    
    if (timeline) {
        timeline.after(educationForm);
    } else {
        educationSection.querySelector('h3').after(educationForm);
    }
    
    // Gestion de la fermeture
    educationForm.querySelector('.btn-close-form').addEventListener('click', () => {
        educationForm.remove();
    });
    
    educationForm.querySelector('.btn-cancel').addEventListener('click', () => {
        educationForm.remove();
    });
    
    // Gestion de l'enregistrement
    educationForm.querySelector('.btn-save').addEventListener('click', function() {
        saveEducationForm(educationForm);
    });
    
    // Focus sur le premier champ
    educationForm.querySelector('input, select').focus();
}

/**
 * Sauvegarder un formulaire de formation
 */
function saveEducationForm(form) {
    // Validation
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) {
        window.INSTI?.showToast('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Récupérer les données
    const formData = new FormData(form);
    const educationData = {};
    formData.forEach((value, key) => {
        educationData[key] = value;
    });
    
    // Créer l'élément d'affichage
    const educationElement = document.createElement('div');
    educationElement.className = 'timeline-item';
    educationElement.innerHTML = `
        <h4>${educationData.diploma === 'doctorat' ? 'Doctorat' : 
               educationData.diploma === 'master' ? 'Master' : 
               educationData.diploma === 'licence' ? 'Licence' : 'Diplôme'} en ${educationData.specialty}</h4>
        <p>${educationData.institution}</p>
        <span class="date">${educationData.year}</span>
        ${educationData.description ? `<p class="desc">${educationData.description}</p>` : ''}
    `;
    
    // Ajouter à la timeline
    form.before(educationElement);
    
    // Supprimer le formulaire
    form.remove();
    
    // Sauvegarder dans localStorage
    saveEducationToStorage(educationData);
    
    // Mettre à jour la progression
    updateProfileProgress();
    
    window.INSTI?.showToast('Formation ajoutée avec succès', 'success');
}

/**
 * Sauvegarder une formation dans le stockage
 */
function saveEducationToStorage(educationData) {
    let educations = JSON.parse(localStorage.getItem('insti_educations') || '[]');
    educations.push({
        ...educationData,
        id: Date.now(),
        addedAt: new Date().toISOString()
    });
    localStorage.setItem('insti_educations', JSON.stringify(educations));
}

/**
 * Ajouter un formulaire d'expérience
 */
function addExperienceForm() {
    // Similaire à addEducationForm mais pour les expériences
    // Implémentation similaire...
}

/**
 * Télécharger un document
 */
function uploadDocument() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.multiple = true;
    
    input.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        processUploadedDocuments(files);
    });
    
    input.click();
}

/**
 * Traiter les documents téléchargés
 */
function processUploadedDocuments(files) {
    const docsList = document.querySelector('.doc-list');
    if (!docsList) return;
    
    // Afficher une modal de progression
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Téléchargement des documents</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Téléchargement de ${files.length} document(s)...</p>
                <div class="upload-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
                <div class="files-progress-list"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Simuler l'upload
    simulateDocumentsUpload(files, modal, docsList);
    
    // Gestion de la fermeture
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * Simuler l'upload de documents
 */
function simulateDocumentsUpload(files, modal, docsList) {
    const progressFill = modal.querySelector('.progress-fill');
    const progressText = modal.querySelector('.progress-text');
    const filesList = modal.querySelector('.files-progress-list');
    
    let uploaded = 0;
    const total = files.length;
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-upload-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
                <span class="file-size">(${(file.size / 1024).toFixed(1)}KB)</span>
            </div>
            <div class="file-status">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        `;
        filesList.appendChild(fileItem);
        
        // Simuler l'upload avec délai
        setTimeout(() => {
            uploaded++;
            const progress = (uploaded / total) * 100;
            
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            
            // Mettre à jour le statut
            const fileStatus = fileItem.querySelector('.file-status');
            fileStatus.innerHTML = '<i class="fas fa-check text-success"></i>';
            
            // Ajouter le document à la liste
            addDocumentToList(file, docsList);
            
            // Si tous uploadés
            if (uploaded === total) {
                setTimeout(() => {
                    modal.remove();
                    window.INSTI?.showToast(`${total} document(s) ajouté(s)`, 'success');
                    
                    // Mettre à jour la progression
                    updateProfileProgress();
                }, 1000);
            }
        }, 1000 * (index + 1));
    });
}

/**
 * Ajouter un document à la liste
 */
function addDocumentToList(file, docsList) {
    const fileType = file.type.includes('pdf') ? 'pdf' :
                     file.type.includes('word') ? 'word' :
                     file.type.includes('image') ? 'image' : 'file';
    
    const docItem = document.createElement('div');
    docItem.className = 'doc-item';
    docItem.innerHTML = `
        <div class="doc-info">
            <i class="fas fa-file-${fileType}"></i>
            <div class="doc-content">
                <p class="doc-name">${file.name}</p>
                <div class="doc-meta">
                    <span>${(file.size / 1024).toFixed(1)}KB</span>
                    <span>${new Date().toLocaleDateString('fr-FR')}</span>
                    <span class="status-badge status-pending">En attente</span>
                </div>
            </div>
        </div>
        <div class="doc-actions">
            <a href="#">Voir</a>
            <a href="#" class="download">Télécharger</a>
        </div>
    `;
    
    // Ajouter à la liste
    const addBtn = docsList.querySelector('.add-doc-btn');
    if (addBtn) {
        addBtn.before(docItem);
    } else {
        docsList.appendChild(docItem);
    }
    
    // Initialiser les événements du nouveau document
    initDocumentDownloadsForItem(docItem);
}

/**
 * Initialiser les téléchargements pour un nouvel élément
 */
function initDocumentDownloadsForItem(docItem) {
    const downloadLink = docItem.querySelector('.download');
    const viewLink = docItem.querySelector('a:not(.download)');
    
    if (downloadLink) {
        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            const docName = docItem.querySelector('.doc-name')?.textContent || 'document';
            simulateDownload(docName, '');
        });
    }
    
    if (viewLink) {
        viewLink.addEventListener('click', function(e) {
            e.preventDefault();
            const docName = docItem.querySelector('.doc-name')?.textContent || 'document';
            openDocumentViewer(docName);
        });
    }
}

/**
 * Initialisation de la barre de progression
 */
function initProfileProgress() {
    const progressTag = document.querySelector('.progress-tag');
    if (!progressTag) return;
    
    // Calculer la progression
    const progress = calculateProfileProgress();
    
    // Mettre à jour l'affichage
    updateProgressTag(progressTag, progress);
}

/**
 * Calculer la progression du profil
 */
function calculateProfileProgress() {
    let progress = 0;
    const totalSections = 5; // Infos perso, formations, expériences, documents, etc.
    
    // Vérifier les informations personnelles (20%)
    const personalInfoComplete = isPersonalInfoComplete();
    progress += personalInfoComplete ? 20 : 0;
    
    // Vérifier les formations (20%)
    const educationCount = document.querySelectorAll('.timeline-item').length;
    progress += Math.min(educationCount * 5, 20); // 5% par formation
    
    // Vérifier les expériences (20%)
    const experienceCount = document.querySelectorAll('.experience-item, .timeline-item:nth-child(3)').length;
    progress += Math.min(experienceCount * 5, 20); // 5% par expérience
    
    // Vérifier les documents (20%)
    const documentCount = document.querySelectorAll('.doc-item').length;
    progress += Math.min(documentCount * 4, 20); // 4% par document
    
    // Vérifier la spécialité (20%)
    const specialtySelected = document.querySelector('#specialty')?.value || 
                              localStorage.getItem('insti_user_specialty');
    progress += specialtySelected ? 20 : 0;
    
    return Math.min(progress, 100);
}

/**
 * Vérifier si les informations personnelles sont complètes
 */
function isPersonalInfoComplete() {
    const requiredFields = ['nom', 'prenom', 'email'];
    let complete = true;
    
    requiredFields.forEach(field => {
        const element = document.querySelector(`[data-field="${field}"]`);
        if (!element || !element.textContent.trim()) {
            complete = false;
        }
    });
    
    return complete;
}

/**
 * Mettre à jour le tag de progression
 */
function updateProgressTag(element, progress) {
    element.innerHTML = `<i class="fas fa-chart-line"></i> Profil complété à ${progress}%`;
    
    // Changer la couleur en fonction de la progression
    if (progress < 30) {
        element.style.backgroundColor = '#fee2e2';
        element.style.color = '#991b1b';
    } else if (progress < 70) {
        element.style.backgroundColor = '#fef3c7';
        element.style.color = '#92400e';
    } else {
        element.style.backgroundColor = '#d1fae5';
        element.style.color = '#065f46';
    }
}

/**
 * Mettre à jour la progression du profil
 */
function updateProfileProgress() {
    const progress = calculateProfileProgress();
    const progressTag = document.querySelector('.progress-tag');
    
    if (progressTag) {
        updateProgressTag(progressTag, progress);
    }
    
    // Sauvegarder la progression
    localStorage.setItem('insti_profile_progress', progress);
}

/**
 * Initialisation du téléchargement d'image
 */
function initProfileImageUpload() {
    const avatar = document.querySelector('.avatar');
    if (!avatar) return;
    
    avatar.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('image/')) {
                window.INSTI?.showToast('Veuillez sélectionner une image', 'error');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB
                window.INSTI?.showToast('L\'image ne doit pas dépasser 5MB', 'error');
                return;
            }
            
            uploadProfileImage(file, avatar);
        });
        
        input.click();
    });
}

/**
 * Télécharger l'image de profil
 */
function uploadProfileImage(file, avatar) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Créer une nouvelle image
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Photo de profil';
        
        // Remplacer l'icône par l'image
        avatar.innerHTML = '';
        avatar.appendChild(img);
        
        // Sauvegarder dans localStorage
        localStorage.setItem('insti_profile_image', e.target.result);
        
        window.INSTI?.showToast('Photo de profil mise à jour', 'success');
    };
    
    reader.readAsDataURL(file);
}

/**
 * Charger les données du profil
 */
function loadProfileData() {
    // Charger l'image de profil
    const savedImage = localStorage.getItem('insti_profile_image');
    if (savedImage) {
        const avatar = document.querySelector('.avatar');
        if (avatar) {
            const img = document.createElement('img');
            img.src = savedImage;
            img.alt = 'Photo de profil';
            avatar.innerHTML = '';
            avatar.appendChild(img);
        }
    }
    
    // Charger la progression
    const savedProgress = localStorage.getItem('insti_profile_progress');
    if (savedProgress) {
        const progressTag = document.querySelector('.progress-tag');
        if (progressTag) {
            updateProgressTag(progressTag, parseInt(savedProgress));
        }
    }
    
    // Charger les formations
    const savedEducations = JSON.parse(localStorage.getItem('insti_educations') || '[]');
    if (savedEducations.length > 0) {
        // Ajouter les formations sauvegardées à l'affichage
        // (implémentation similaire à saveEducationForm)
    }
}
