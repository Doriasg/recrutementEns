/**
 * Formulaire de Candidature - INSTI Plateforme
 * Gestion du formulaire multi-étapes de candidature
 */

document.addEventListener('DOMContentLoaded', function() {
    initApplicationForm();
});

function initApplicationForm() {
    // Initialisation du formulaire multi-étapes
    initMultiStepForm();
    
    // Initialisation des champs dynamiques
    initDynamicFields();
    
    // Initialisation du téléchargement de fichiers
    initFileUpload();
    
    // Initialisation de la validation
    initFormValidation();
    
    // Initialisation du compteur de jours
    initDaysCounter();
    
    // Initialisation du bouton d'impression
    initPrintButton();
    
    // Initialisation de la sauvegarde automatique
    initAutoSave();
    
    // Charger les données sauvegardées
    loadSavedData();
}

/**
 * Initialisation du formulaire multi-étapes
 */
function initMultiStepForm() {
    const steps = document.querySelectorAll('.step');
    const formSections = document.querySelectorAll('.form-section');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Initialiser la progression
    updateProgress(currentStep);
    
    // Bouton Suivant
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateProgress(currentStep);
                updateFormDisplay();
            }
        });
    }
    
    // Bouton Précédent
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentStep--;
            updateProgress(currentStep);
            updateFormDisplay();
        });
    }
    
    // Bouton Soumettre
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (validateStep(currentStep)) {
                submitApplicationForm();
            }
        });
    }
    
    // Navigation par étapes
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            const stepNumber = parseInt(step.dataset.step);
            
            // Ne permettre que d'aller aux étapes précédentes
            if (stepNumber <= currentStep) {
                currentStep = stepNumber;
                updateProgress(currentStep);
                updateFormDisplay();
            }
        });
    });
    
    // Mettre à jour l'affichage
    function updateFormDisplay() {
        // Masquer toutes les sections
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Afficher la section active
        const activeSection = document.getElementById(`step${currentStep}`);
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Mettre à jour les boutons
        if (prevBtn) {
            prevBtn.style.display = currentStep === 1 ? 'none' : 'flex';
        }
        
        if (nextBtn) {
            nextBtn.style.display = currentStep === totalSteps ? 'none' : 'flex';
        }
        
        if (submitBtn) {
            submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
        }
        
        // Mettre à jour les étapes
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            if (stepNumber < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        
        // Sauvegarder la progression
        saveFormProgress(currentStep);
    }
}

/**
 * Mettre à jour la progression
 */
function updateProgress(currentStep) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        const percentage = (currentStep / 4) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `Étape ${currentStep} sur 4`;
    }
}

/**
 * Valider une étape
 */
function validateStep(stepNumber) {
    const stepSection = document.getElementById(`step${stepNumber}`);
    if (!stepSection) return true;
    
    let isValid = true;
    
    // Réinitialiser les erreurs
    clearStepErrors(stepSection);
    
    // Validation spécifique par étape
    switch(stepNumber) {
        case 1:
            isValid = validateStep1(stepSection);
            break;
        case 2:
            isValid = validateStep2(stepSection);
            break;
        case 3:
            isValid = validateStep3(stepSection);
            break;
        case 4:
            isValid = validateStep4(stepSection);
            break;
    }
    
    // Afficher les erreurs
    if (!isValid) {
        window.INSTI?.showToast('Veuillez corriger les erreurs avant de continuer', 'error');
        
        // Faire défiler jusqu'à la première erreur
        const firstError = stepSection.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
    
    return isValid;
}

/**
 * Valider l'étape 1 (Informations personnelles)
 */
function validateStep1(section) {
    let isValid = true;
    const requiredFields = section.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Ce champ est obligatoire');
            isValid = false;
        } else {
            // Validation spécifique
            if (field.type === 'email' && !window.INSTI?.isValidEmail(field.value)) {
                showFieldError(field, 'Veuillez entrer une adresse email valide');
                isValid = false;
            }
            
            if (field.type === 'tel' && !window.INSTI?.isValidPhone(field.value)) {
                showFieldError(field, 'Veuillez entrer un numéro de téléphone valide');
                isValid = false;
            }
            
            if (field.type === 'date') {
                const date = new Date(field.value);
                const today = new Date();
                
                if (date > today) {
                    showFieldError(field, 'La date de naissance ne peut pas être dans le futur');
                    isValid = false;
                }
                
                // Vérifier l'âge minimum (18 ans)
                const minAgeDate = new Date();
                minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
                
                if (date > minAgeDate) {
                    showFieldError(field, 'Vous devez avoir au moins 18 ans');
                    isValid = false;
                }
            }
        }
    });
    
    return isValid;
}

/**
 * Valider l'étape 2 (Formation)
 */
function validateStep2(section) {
    const formations = section.querySelectorAll('.sub-container');
    
    // Vérifier qu'il y a au moins une formation
    if (formations.length === 0) {
        window.INSTI?.showToast('Veuillez ajouter au moins une formation', 'error');
        return false;
    }
    
    let isValid = true;
    
    formations.forEach((formation, index) => {
        const requiredFields = formation.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, `Formation ${index + 1} : Ce champ est obligatoire`);
                isValid = false;
            } else {
                // Validation spécifique pour l'année
                if (field.name.includes('annee_obtention')) {
                    const year = parseInt(field.value);
                    const currentYear = new Date().getFullYear();
                    
                    if (year < 1970 || year > currentYear) {
                        showFieldError(field, `Année invalide (1970-${currentYear})`);
                        isValid = false;
                    }
                }
            }
        });
    });
    
    return isValid;
}

/**
 * Valider l'étape 3 (Expérience)
 */
function validateStep3(section) {
    const experiences = section.querySelectorAll('.sub-container');
    let isValid = true;
    
    // Vérifier qu'il y a au moins une expérience
    if (experiences.length === 0) {
        window.INSTI?.showToast('Veuillez ajouter au moins une expérience', 'error');
        return false;
    }
    
    experiences.forEach((experience, index) => {
        const requiredFields = experience.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, `Expérience ${index + 1} : Ce champ est obligatoire`);
                isValid = false;
            }
        });
        
        // Validation des dates
        const dateDebut = experience.querySelector('input[name="date_debut[]"]');
        const dateFin = experience.querySelector('input[name="date_fin[]"]');
        
        if (dateDebut && dateFin && dateDebut.value && dateFin.value) {
            const debut = new Date(dateDebut.value);
            const fin = new Date(dateFin.value);
            
            if (fin < debut) {
                showFieldError(dateFin, 'La date de fin doit être après la date de début');
                isValid = false;
            }
            
            // Vérifier que la date de fin n'est pas dans le futur
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (fin > today) {
                showFieldError(dateFin, 'La date de fin ne peut pas être dans le futur');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

/**
 * Valider l'étape 4 (Documents)
 */
function validateStep4(section) {
    const fileList = section.querySelector('#fileList');
    const files = fileList.querySelectorAll('.file-item');
    
    // Vérifier qu'il y a au moins un document
    if (files.length === 0) {
        window.INSTI?.showToast('Veuillez télécharger au moins un document', 'error');
        return false;
    }
    
    // Vérifier les types de documents requis
    const requiredDocs = ['CV', 'Lettre de motivation', 'Diplômes'];
    const uploadedDocs = Array.from(files).map(file => {
        return file.querySelector('.file-name')?.textContent.toLowerCase() || '';
    });
    
    // Vérification basique (dans la réalité, ce serait plus sophistiqué)
    let missingDocs = [];
    
    requiredDocs.forEach(doc => {
        const hasDoc = uploadedDocs.some(uploaded => 
            uploaded.includes(doc.toLowerCase().split(' ')[0])
        );
        
        if (!hasDoc) {
            missingDocs.push(doc);
        }
    });
    
    if (missingDocs.length > 0) {
        window.INSTI?.showToast(
            `Documents manquants : ${missingDocs.join(', ')}`,
            'warning'
        );
        return false;
    }
    
    return true;
}

/**
 * Afficher une erreur de champ
 */
function showFieldError(field, message) {
    const formGroup = field.closest('.field');
    if (!formGroup) return;
    
    formGroup.classList.add('has-error');
    
    // Supprimer l'ancienne erreur
    const oldError = formGroup.querySelector('.field-error');
    if (oldError) oldError.remove();
    
    // Ajouter la nouvelle erreur
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    formGroup.appendChild(error);
}

/**
 * Effacer les erreurs d'une étape
 */
function clearStepErrors(section) {
    section.querySelectorAll('.has-error').forEach(group => {
        group.classList.remove('has-error');
        const error = group.querySelector('.field-error');
        if (error) error.remove();
    });
}

/**
 * Initialisation des champs dynamiques
 */
function initDynamicFields() {
    // Bouton "Ajouter une formation"
    const addFormationBtn = document.getElementById('addFormation');
    if (addFormationBtn) {
        addFormationBtn.addEventListener('click', addFormationField);
    }
    
    // Bouton "Ajouter une expérience"
    const addExperienceBtn = document.getElementById('addExperience');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', addExperienceField);
    }
    
    // Boutons de suppression
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-btn')) {
            const container = e.target.closest('.sub-container');
            if (container) {
                container.remove();
                updateFieldNumbers();
            }
        }
    });
}

/**
 * Ajouter un champ de formation
 */
function addFormationField() {
    const container = document.getElementById('formationsContainer');
    if (!container) return;
    
    const count = container.querySelectorAll('.sub-container').length + 1;
    
    const formationHTML = `
        <div class="sub-container">
            <p class="sub-label">
                Formation ${count}
                <button type="button" class="remove-btn">
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
                    <div class="field-error"></div>
                </div>
                <div class="field">
                    <label class="required">Spécialité</label>
                    <input type="text" name="specialite[]" placeholder="Ex: Génie Électrique" required>
                    <div class="field-error"></div>
                </div>
                <div class="field">
                    <label class="required">Établissement</label>
                    <input type="text" name="etablissement[]" placeholder="Nom de l'établissement" required>
                    <div class="field-error"></div>
                </div>
                <div class="field">
                    <label class="required">Année d'obtention</label>
                    <input type="number" name="annee_obtention[]" min="1970" max="2024" placeholder="2020" required>
                    <div class="field-error"></div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', formationHTML);
    
    // Focus sur le premier champ de la nouvelle formation
    const newFormation = container.lastElementChild;
    const firstInput = newFormation.querySelector('input, select');
    if (firstInput) firstInput.focus();
}

/**
 * Ajouter un champ d'expérience
 */
function addExperienceField() {
    const container = document.getElementById('experiencesContainer');
    if (!container) return;
    
    const count = container.querySelectorAll('.sub-container').length + 1;
    
    const experienceHTML = `
        <div class="sub-container">
            <p class="sub-label">
                Expérience ${count}
                <button type="button" class="remove-btn">
                    <i class="fas fa-times"></i>
                </button>
            </p>
            <div class="input-grid">
                <div class="field full-width">
                    <label class="required">Poste occupé</label>
                    <input type="text" name="poste[]" placeholder="Ex: Enseignant-Chercheur" required>
                    <div class="field-error"></div>
                </div>
                <div class="field full-width">
                    <label class="required">Établissement/Entreprise</label>
                    <input type="text" name="entreprise[]" placeholder="Nom de l'établissement" required>
                    <div class="field-error"></div>
                </div>
                <div class="field">
                    <label class="required">Date de début</label>
                    <input type="month" name="date_debut[]" required>
                    <div class="field-error"></div>
                </div>
                <div class="field">
                    <label>Date de fin</label>
                    <input type="month" name="date_fin[]">
                    <div class="field-error"></div>
                </div>
                <div class="field full-width">
                    <label class="required">Description des tâches</label>
                    <textarea name="description[]" placeholder="Description des tâches" rows="3" required></textarea>
                    <div class="field-error"></div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', experienceHTML);
    
    // Focus sur le premier champ
    const newExperience = container.lastElementChild;
    const firstInput = newExperience.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
}

/**
 * Mettre à jour les numéros des champs
 */
function updateFieldNumbers() {
    // Mettre à jour les numéros des formations
    const formations = document.querySelectorAll('#formationsContainer .sub-container');
    formations.forEach((formation, index) => {
        const label = formation.querySelector('.sub-label');
        if (label) {
            label.firstChild.textContent = `Formation ${index + 1} `;
        }
    });
    
    // Mettre à jour les numéros des expériences
    const experiences = document.querySelectorAll('#experiencesContainer .sub-container');
    experiences.forEach((experience, index) => {
        const label = experience.querySelector('.sub-label');
        if (label) {
            label.firstChild.textContent = `Expérience ${index + 1} `;
        }
    });
}

/**
 * Initialisation du téléchargement de fichiers
 */
function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    
    if (!uploadArea || !fileInput || !fileList) return;
    
    // Clic sur la zone d'upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    // Changement via l'input file
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFiles(e.target.files);
        }
    });
}

/**
 * Gérer les fichiers téléchargés
 */
function handleFiles(files) {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    // Supprimer le message "Aucun fichier téléchargé"
    const placeholder = fileList.querySelector('.upload-hint');
    if (placeholder) placeholder.remove();
    
    Array.from(files).forEach(file => {
        // Vérifier la taille (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            window.INSTI?.showToast(`Le fichier ${file.name} dépasse 10MB`, 'error');
            return;
        }
        
        // Vérifier le type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png'
        ];
        
        if (!allowedTypes.includes(file.type)) {
            window.INSTI?.showToast(`Type de fichier non supporté : ${file.name}`, 'error');
            return;
        }
        
        // Ajouter le fichier à la liste
        addFileToList(file);
    });
    
    // Réinitialiser l'input file
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
}

/**
 * Ajouter un fichier à la liste
 */
function addFileToList(file) {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    const fileType = getFileType(file);
    const fileSize = formatFileSize(file.size);
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.fileName = file.name;
    fileItem.innerHTML = `
        <div class="file-info">
            <div class="file-icon">
                <i class="fas fa-file-${fileType}"></i>
            </div>
            <div>
                <div class="file-name">${file.name}</div>
                <div class="file-size">${fileSize}</div>
            </div>
        </div>
        <div class="file-remove" title="Supprimer">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    fileList.appendChild(fileItem);
    
    // Ajouter l'événement de suppression
    const removeBtn = fileItem.querySelector('.file-remove');
    removeBtn.addEventListener('click', function() {
        fileItem.remove();
        
        // Si plus de fichiers, réafficher le message
        if (fileList.children.length === 0) {
            const placeholder = document.createElement('p');
            placeholder.className = 'upload-hint';
            placeholder.textContent = 'Aucun fichier téléchargé';
            fileList.appendChild(placeholder);
        }
    });
}

/**
 * Obtenir le type de fichier
 */
function getFileType(file) {
    if (file.type.includes('pdf')) return 'pdf';
    if (file.type.includes('word')) return 'word';
    if (file.type.includes('image')) return 'image';
    return 'file';
}

/**
 * Formater la taille du fichier
 */
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

/**
 * Initialisation de la validation
 */
function initFormValidation() {
    // Validation en temps réel
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Pour les emails et téléphones, valider au fur et à mesure
        if (field.type === 'email' || field.type === 'tel') {
            field.addEventListener('input', function() {
                validateField(this, true);
            });
        }
    });
}

/**
 * Valider un champ individuel
 */
function validateField(field, realTime = false) {
    const value = field.value.trim();
    
    // Réinitialiser l'erreur
    clearFieldError(field);
    
    // Si le champ est vide mais pas requis en temps réel
    if (!value && !field.hasAttribute('required') && realTime) {
        return true;
    }
    
    // Validation des champs requis
    if (field.hasAttribute('required') && !value) {
        if (!realTime) {
            showFieldError(field, 'Ce champ est obligatoire');
        }
        return false;
    }
    
    // Validation spécifique par type
    if (value) {
        switch(field.type) {
            case 'email':
                if (!window.INSTI?.isValidEmail(value)) {
                    showFieldError(field, 'Veuillez entrer une adresse email valide');
                    return false;
                }
                break;
                
            case 'tel':
                if (!window.INSTI?.isValidPhone(value)) {
                    showFieldError(field, 'Veuillez entrer un numéro de téléphone valide');
                    return false;
                }
                break;
                
            case 'number':
                const min = field.getAttribute('min');
                const max = field.getAttribute('max');
                const numValue = parseFloat(value);
                
                if (min && numValue < parseFloat(min)) {
                    showFieldError(field, `La valeur minimale est ${min}`);
                    return false;
                }
                
                if (max && numValue > parseFloat(max)) {
                    showFieldError(field, `La valeur maximale est ${max}`);
                    return false;
                }
                break;
                
            case 'date':
            case 'month':
                const dateValue = new Date(value);
                const today = new Date();
                
                if (dateValue > today) {
                    showFieldError(field, 'La date ne peut pas être dans le futur');
                    return false;
                }
                break;
        }
    }
    
    return true;
}

/**
 * Effacer l'erreur d'un champ
 */
function clearFieldError(field) {
    const formGroup = field.closest('.field');
    if (formGroup) {
        formGroup.classList.remove('has-error');
        const error = formGroup.querySelector('.field-error');
        if (error) error.remove();
    }
}

/**
 * Initialisation du compteur de jours
 */
function initDaysCounter() {
    const deadlineElement = document.querySelector('.deadline-date');
    if (!deadlineElement) return;
    
    const deadlineText = deadlineElement.textContent.match(/\d{1,2} \w+ \d{4}/)?.[0];
    if (!deadlineText) return;
    
    const deadlineDate = parseFrenchDate(deadlineText);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Mettre à jour l'affichage
    updateDaysDisplay(diffDays);
    
    // Mettre à jour tous les jours
    if (diffDays > 0) {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilMidnight = tomorrow - now;
        
        setTimeout(() => {
            updateDaysDisplay(diffDays - 1);
            setInterval(() => {
                const newDiffDays = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));
                updateDaysDisplay(newDiffDays);
            }, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);
    }
}

/**
 * Parser une date française
 */
function parseFrenchDate(dateString) {
    const months = {
        'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
        'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };
    
    const parts = dateString.toLowerCase().split(' ');
    if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = months[parts[1]];
        const year = parseInt(parts[2]);
        
        if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            return new Date(year, month, day);
        }
    }
    
    // Fallback
    return new Date(dateString);
}

/**
 * Mettre à jour l'affichage des jours
 */
function updateDaysDisplay(days) {
    const daysElement = document.querySelector('.deadline-remaining');
    if (!daysElement) return;
    
    if (days < 0) {
        daysElement.innerHTML = '<i class="fas fa-clock"></i> <span style="color: #ef4444">offre expirée</span>';
    } else if (days === 0) {
        daysElement.innerHTML = '<i class="fas fa-clock"></i> <span style="color: #f59e0b">dernier jour !</span>';
    } else if (days <= 3) {
        daysElement.innerHTML = `<i class="fas fa-clock"></i> <span style="color: #f59e0b">il reste ${days} jour${days > 1 ? 's' : ''}</span>`;
    } else {
        daysElement.innerHTML = `<i class="fas fa-clock"></i> <span>il reste ${days} jours</span>`;
    }
}

/**
 * Initialisation du bouton d'impression
 */
function initPrintButton() {
    const printBtn = document.getElementById('printButton');
    if (!printBtn) return;
    
    printBtn.addEventListener('click', function(e) {
        e.preventDefault();
        printApplicationForm();
    });
}

/**
 * Imprimer le formulaire
 */
function printApplicationForm() {
    // Créer une version imprimable
    const printContent = document.querySelector('.form-card').cloneNode(true);
    
    // Supprimer les éléments non nécessaires
    printContent.querySelectorAll('.progress-container, .stepper, .form-navigation, .no-print').forEach(el => {
        el.remove();
    });
    
    // Afficher toutes les sections
    printContent.querySelectorAll('.form-section').forEach(section => {
        section.style.display = 'block';
    });
    
    // Ouvrir la fenêtre d'impression
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Formulaire de Candidature - ${document.querySelector('.offer-title')?.textContent || 'INSTI'}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
                h1 { color: #0a3f8f; text-align: center; margin-bottom: 30px; }
                h2 { color: #333; margin-top: 30px; border-bottom: 2px solid #0a3f8f; padding-bottom: 5px; }
                .section-title { background: #f8f9fa; padding: 10px; margin-top: 20px; }
                .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0; }
                .field { margin-bottom: 15px; }
                .field label { font-weight: bold; display: block; margin-bottom: 5px; }
                .field input, .field select, .field textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
                .sub-container { border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 4px; }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none !important; }
                    .form-section { break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <h1>Formulaire de Candidature</h1>
            <h2>${document.querySelector('.offer-title')?.textContent || 'Offre d\'emploi'}</h2>
            <p><strong>Référence :</strong> ${document.querySelector('.offer-badge')?.textContent || ''}</p>
            <p><strong>Date d'impression :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
            <hr>
            ${printContent.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Imprimer après le chargement
    printWindow.onload = function() {
        printWindow.print();
        printWindow.onafterprint = function() {
            printWindow.close();
        };
    };
}

/**
 * Initialisation de la sauvegarde automatique
 */
function initAutoSave() {
    // Sauvegarder toutes les 30 secondes
    setInterval(saveFormData, 30000);
    
    // Sauvegarder aussi quand l'utilisateur quitte la page
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges()) {
            saveFormData();
            
            // Demander confirmation
            e.preventDefault();
            e.returnValue = 'Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?';
        }
    });
}

/**
 * Vérifier s'il y a des modifications non sauvegardées
 */
function hasUnsavedChanges() {
    const savedData = localStorage.getItem('insti_application_draft');
    const currentData = getFormData();
    
    return JSON.stringify(savedData) !== JSON.stringify(currentData);
}

/**
 * Obtenir les données du formulaire
 */
function getFormData() {
    const form = document.getElementById('candidatureForm');
    if (!form) return {};
    
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        if (!data[key]) {
            data[key] = value;
        } else if (Array.isArray(data[key])) {
            data[key].push(value);
        } else {
            data[key] = [data[key], value];
        }
    });
    
    // Ajouter les fichiers
    const files = document.querySelectorAll('.file-item');
    data.files = Array.from(files).map(file => ({
        name: file.dataset.fileName,
        size: file.querySelector('.file-size')?.textContent
    }));
    
    // Ajouter la progression
    const currentStep = parseInt(localStorage.getItem('insti_application_step') || '1');
    data.currentStep = currentStep;
    
    return data;
}

/**
 * Sauvegarder les données du formulaire
 */
function saveFormData() {
    const data = getFormData();
    localStorage.setItem('insti_application_draft', JSON.stringify(data));
    
    // Afficher un indicateur discret
    const saveIndicator = document.querySelector('.save-indicator');
    if (!saveIndicator) {
        const indicator = document.createElement('div');
        indicator.className = 'save-indicator';
        indicator.textContent = 'Sauvegarde automatique...';
        document.querySelector('.form-navigation')?.appendChild(indicator);
        
        setTimeout(() => {
            indicator.textContent = 'Sauvegardé';
            setTimeout(() => indicator.remove(), 2000);
        }, 500);
    }
}

/**
 * Sauvegarder la progression
 */
function saveFormProgress(step) {
    localStorage.setItem('insti_application_step', step.toString());
}

/**
 * Charger les données sauvegardées
 */
function loadSavedData() {
    const savedData = localStorage.getItem('insti_application_draft');
    const savedStep = localStorage.getItem('insti_application_step');
    
    if (!savedData || !savedStep) return;
    
    try {
        const data = JSON.parse(savedData);
        const step = parseInt(savedStep);
        
        // Restaurer la progression
        if (step > 1) {
            const confirmLoad = confirm('Une candidature en cours a été trouvée. Voulez-vous la reprendre ?');
            
            if (confirmLoad) {
                // Restaurer les données
                restoreFormData(data);
                
                // Aller à la dernière étape
                const event = new CustomEvent('loadSavedData', { detail: { step, data } });
                document.dispatchEvent(event);
                
                window.INSTI?.showToast('Candidature restaurée', 'success');
            } else {
                // Supprimer les données sauvegardées
                localStorage.removeItem('insti_application_draft');
                localStorage.removeItem('insti_application_step');
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données sauvegardées:', error);
    }
}

/**
 * Restaurer les données du formulaire
 */
function restoreFormData(data) {
    const form = document.getElementById('candidatureForm');
    if (!form) return;
    
    // Restaurer les champs simples
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'files' || key === 'currentStep') return;
        
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
            if (Array.isArray(value)) {
                // Pour les champs multiples (formations, expériences)
                value.forEach((val, index) => {
                    if (index === 0) {
                        field.value = val;
                    } else {
                        // Ajouter un nouveau champ
                        if (key.includes('diplome') || key.includes('specialite')) {
                            addFormationField();
                        } else if (key.includes('poste') || key.includes('entreprise')) {
                            addExperienceField();
                        }
                        
                        // Remplir le dernier champ ajouté
                        const lastField = form.querySelectorAll(`[name="${key}"]`)[index];
                        if (lastField) lastField.value = val;
                    }
                });
            } else {
                field.value = value;
            }
        }
    });
    
    // Restaurer les fichiers (simulation)
    if (data.files && Array.isArray(data.files)) {
        const fileList = document.getElementById('fileList');
        if (fileList) {
            data.files.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.dataset.fileName = file.name;
                fileItem.innerHTML = `
                    <div class="file-info">
                        <div class="file-icon">
                            <i class="fas fa-file"></i>
                        </div>
                        <div>
                            <div class="file-name">${file.name}</div>
                            <div class="file-size">${file.size}</div>
                        </div>
                    </div>
                    <div class="file-remove" title="Supprimer">
                        <i class="fas fa-times"></i>
                    </div>
                `;
                
                fileList.appendChild(fileItem);
            });
        }
    }
}

/**
 * Soumettre le formulaire de candidature
 */
function submitApplicationForm() {
    const form = document.getElementById('candidatureForm');
    if (!form) return;
    
    // Valider toutes les étapes
    for (let i = 1; i <= 4; i++) {
        if (!validateStep(i)) {
            // Aller à l'étape avec erreur
            currentStep = i;
            updateProgress(currentStep);
            updateFormDisplay();
            
            window.INSTI?.showToast('Veuillez corriger toutes les erreurs avant de soumettre', 'error');
            return;
        }
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Afficher le chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Soumission en cours...';
    
    // Simulation d'envoi
    setTimeout(() => {
        // Simuler une réponse du serveur
        const mockResponse = {
            success: true,
            message: 'Candidature soumise avec succès !',
            applicationId: 'APP-' + Date.now(),
            redirect: '/teacher/dashboard'
        };
        
        if (mockResponse.success) {
            // Afficher la modale de succès
            showSuccessModal(mockResponse);
            
            // Nettoyer le localStorage
            localStorage.removeItem('insti_application_draft');
            localStorage.removeItem('insti_application_step');
            
            // Sauvegarder la candidature
            saveApplicationToHistory(mockResponse);
        } else {
            // Afficher une erreur
            window.INSTI?.showToast(mockResponse.message, 'error');
            
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }, 3000);
}

/**
 * Afficher la modale de succès
 */
function showSuccessModal(response) {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');
        
        // Mettre à jour les informations
        const appIdElement = modal.querySelector('#applicationId');
        if (appIdElement) {
            appIdElement.textContent = response.applicationId;
        }
        
        // Gestion des boutons
        modal.querySelector('#modalClose').addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        modal.querySelector('#modalDashboard').addEventListener('click', () => {
            window.location.href = response.redirect;
        });
    }
}

/**
 * Sauvegarder la candidature dans l'historique
 */
function saveApplicationToHistory(response) {
    let applications = JSON.parse(localStorage.getItem('insti_applications_history') || '[]');
    
    applications.push({
        id: response.applicationId,
        title: document.querySelector('.offer-title')?.textContent || 'Candidature',
        submittedAt: new Date().toISOString(),
        status: 'pending'
    });
    
    localStorage.setItem('insti_applications_history', JSON.stringify(applications));
}
