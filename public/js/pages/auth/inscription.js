/**
 * Page Inscription - INSTI Plateforme
 * Gestion du formulaire d'inscription
 */

document.addEventListener('DOMContentLoaded', function() {
    initRegistrationPage();
});

function initRegistrationPage() {
    // Initialisation du formulaire
    initRegistrationForm();
    
    // Initialisation des toggles password
    initPasswordToggles();
    
    // Initialisation de la validation en temps réel
    initRealTimeValidation();
    
    // Initialisation de la vérification de mot de passe
    initPasswordStrength();
    
    // Initialisation des sélecteurs
    initSelects();
    
    // Initialisation des termes et conditions
    initTermsAndConditions();
    
    // Vérifier les paramètres d'URL
    checkURLParams();
}

/**
 * Initialisation du formulaire d'inscription
 */
function initRegistrationForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateRegistrationForm()) {
            submitRegistrationForm();
        }
    });
}

/**
 * Validation du formulaire d'inscription
 */
function validateRegistrationForm() {
    const requiredFields = [
        'name',
        'first_name', 
        'email',
        'password',
        'password_confirmation'
    ];
    
    let isValid = true;
    
    // Réinitialiser les erreurs
    clearErrors();
    
    // Validation des champs requis
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            if (!field.value.trim()) {
                showError(field, 'Ce champ est obligatoire');
                isValid = false;
            }
        }
    });
    
    // Validation de l'email
    const emailField = document.getElementById('email');
    if (emailField && emailField.value.trim()) {
        if (!window.INSTI?.isValidEmail(emailField.value)) {
            showError(emailField, 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
    }
    
    // Validation du mot de passe
    const passwordField = document.getElementById('password');
    const confirmField = document.getElementById('password_confirmation');
    
    if (passwordField && passwordField.value.trim()) {
        if (passwordField.value.length < 8) {
            showError(passwordField, 'Le mot de passe doit contenir au moins 8 caractères');
            isValid = false;
        }
        
        // Vérifier la force du mot de passe
        const strength = window.INSTI?.checkPasswordStrength(passwordField.value) || 0;
        if (strength < 3) {
            showError(passwordField, 'Le mot de passe est trop faible. Utilisez des majuscules, chiffres et caractères spéciaux');
            isValid = false;
        }
    }
    
    // Validation de la confirmation
    if (passwordField && confirmField && 
        passwordField.value !== confirmField.value) {
        showError(confirmField, 'Les mots de passe ne correspondent pas');
        isValid = false;
    }
    
    // Validation des termes et conditions
    const termsField = document.getElementById('terms');
    if (termsField && !termsField.checked) {
        const termsLabel = document.querySelector('label[for="terms"]');
        if (termsLabel) {
            showError(termsLabel, 'Vous devez accepter les conditions d\'utilisation');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Afficher une erreur
 */
function showError(element, message) {
    // Trouver le groupe de formulaire parent
    let formGroup = element.closest('.form-group');
    if (!formGroup && element.tagName === 'LABEL') {
        formGroup = element.closest('.checkbox-group');
    }
    
    if (!formGroup) return;
    
    // Supprimer l'ancienne erreur
    const oldError = formGroup.querySelector('.error-message');
    if (oldError) oldError.remove();
    
    // Ajouter la nouvelle erreur
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    
    // Ajouter la classe d'erreur
    formGroup.classList.add('has-error');
    
    // Focus sur le champ en erreur
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        element.focus();
    }
}

/**
 * Effacer toutes les erreurs
 */
function clearErrors() {
    document.querySelectorAll('.form-group, .checkbox-group').forEach(group => {
        group.classList.remove('has-error');
        const error = group.querySelector('.error-message');
        if (error) error.remove();
    });
}

/**
 * Soumettre le formulaire d'inscription
 */
function submitRegistrationForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Afficher le chargement
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création du compte...';
    
    // Simulation d'envoi (remplacer par une vraie requête AJAX)
    setTimeout(() => {
        // Simuler une réponse du serveur
        const mockResponse = {
            success: true,
            message: 'Compte créé avec succès !',
            redirect: '/login?registered=success'
        };
        
        if (mockResponse.success) {
            // Afficher un message de succès
            window.INSTI?.showToast(mockResponse.message, 'success');
            
            // Sauvegarder les données dans localStorage (pour la démo)
            const userData = {
                name: document.getElementById('name')?.value,
                email: document.getElementById('email')?.value,
                registeredAt: new Date().toISOString()
            };
            localStorage.setItem('insti_user_data', JSON.stringify(userData));
            
            // Redirection
            setTimeout(() => {
                window.location.href = mockResponse.redirect;
            }, 2000);
        } else {
            // Afficher un message d'erreur
            window.INSTI?.showToast(mockResponse.message, 'error');
            
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }, 3000);
}

/**
 * Initialisation des toggles password
 */
function initPasswordToggles() {
    // Toggle mot de passe principal
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Changer l'icône
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
        });
    }
    
    // Toggle confirmation mot de passe
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmInput = document.getElementById('password_confirmation');
    
    if (toggleConfirmPassword && confirmInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmInput.setAttribute('type', type);
            
            // Changer l'icône
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
        });
    }
}

/**
 * Initialisation de la validation en temps réel
 */
function initRealTimeValidation() {
    const fieldsToValidate = [
        'name',
        'first_name',
        'email',
        'phone',
        'password',
        'password_confirmation'
    ];
    
    fieldsToValidate.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Pour l'email, valider au fur et à mesure
        if (fieldName === 'email') {
            field.addEventListener('input', function() {
                if (this.value.trim() && !window.INSTI?.isValidEmail(this.value)) {
                    showError(this, 'Veuillez entrer une adresse email valide');
                } else {
                    clearError(this);
                }
            });
        }
        
        // Pour le téléphone
        if (fieldName === 'phone') {
            field.addEventListener('input', function() {
                if (this.value.trim() && !window.INSTI?.isValidPhone(this.value)) {
                    showError(this, 'Veuillez entrer un numéro de téléphone valide');
                } else {
                    clearError(this);
                }
            });
        }
    });
}

/**
 * Valider un champ individuel
 */
function validateField(field) {
    const value = field.value.trim();
    
    if (!value && field.hasAttribute('required')) {
        showError(field, 'Ce champ est obligatoire');
        return false;
    }
    
    // Validation spécifique par type
    switch(field.type) {
        case 'email':
            if (value && !window.INSTI?.isValidEmail(value)) {
                showError(field, 'Veuillez entrer une adresse email valide');
                return false;
            }
            break;
            
        case 'tel':
            if (value && !window.INSTI?.isValidPhone(value)) {
                showError(field, 'Veuillez entrer un numéro de téléphone valide');
                return false;
            }
            break;
    }
    
    clearError(field);
    return true;
}

/**
 * Effacer l'erreur d'un champ
 */
function clearError(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('has-error');
        const error = formGroup.querySelector('.error-message');
        if (error) error.remove();
    }
}

/**
 * Initialisation de la vérification de mot de passe
 */
function initPasswordStrength() {
    const passwordField = document.getElementById('password');
    if (!passwordField) return;
    
    // Créer l'indicateur de force
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill"></div>
        </div>
        <div class="strength-text">Force du mot de passe : <span>Faible</span></div>
    `;
    
    passwordField.parentNode.appendChild(strengthIndicator);
    
    passwordField.addEventListener('input', function() {
        const password = this.value;
        const strength = window.INSTI?.checkPasswordStrength(password) || 0;
        
        updatePasswordStrength(strength, strengthIndicator);
        
        // Vérifier la confirmation
        const confirmField = document.getElementById('password_confirmation');
        if (confirmField && confirmField.value) {
            if (password !== confirmField.value) {
                showError(confirmField, 'Les mots de passe ne correspondent pas');
            } else {
                clearError(confirmField);
            }
        }
    });
}

/**
 * Mettre à jour l'indicateur de force du mot de passe
 */
function updatePasswordStrength(strength, indicator) {
    const fill = indicator.querySelector('.strength-fill');
    const text = indicator.querySelector('.strength-text span');
    
    let width = '0%';
    let color = '#ef4444';
    let message = 'Très faible';
    
    switch(strength) {
        case 1:
            width = '25%';
            color = '#ef4444';
            message = 'Faible';
            break;
        case 2:
            width = '50%';
            color = '#f59e0b';
            message = 'Moyen';
            break;
        case 3:
            width = '75%';
            color = '#10b981';
            message = 'Fort';
            break;
        case 4:
            width = '100%';
            color = '#10b981';
            message = 'Très fort';
            break;
    }
    
    fill.style.width = width;
    fill.style.backgroundColor = color;
    text.textContent = message;
    text.style.color = color;
}

/**
 * Initialisation des sélecteurs
 */
function initSelects() {
    const specialtySelect = document.getElementById('specialty');
    if (!specialtySelect) return;
    
    // Ajouter un sélecteur personnalisé
    specialtySelect.addEventListener('change', function() {
        const selectedValue = this.value;
        const selectedText = this.options[this.selectedIndex]?.text || '';
        
        // Sauvegarder dans localStorage
        localStorage.setItem('insti_user_specialty', selectedValue);
        
        // Afficher une confirmation si sélectionné
        if (selectedValue) {
            const confirmation = document.createElement('div');
            confirmation.className = 'specialty-confirmation';
            confirmation.innerHTML = `<i class="fas fa-check"></i> Spécialité sélectionnée : ${selectedText}`;
            
            // Supprimer l'ancienne confirmation
            const oldConfirmation = specialtySelect.parentNode.querySelector('.specialty-confirmation');
            if (oldConfirmation) oldConfirmation.remove();
            
            specialtySelect.parentNode.appendChild(confirmation);
            
            // Supprimer après 3 secondes
            setTimeout(() => {
                confirmation.remove();
            }, 3000);
        }
    });
}

/**
 * Initialisation des termes et conditions
 */
function initTermsAndConditions() {
    const termsLinks = document.querySelectorAll('a[href*="terms"], a[href*="privacy"]');
    
    termsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            showTermsModal(href.includes('terms') ? 'terms' : 'privacy');
        });
    });
}

/**
 * Afficher la modale des termes
 */
function showTermsModal(type) {
    const titles = {
        terms: 'Conditions Générales d\'Utilisation',
        privacy: 'Politique de Confidentialité'
    };
    
    const content = {
        terms: `
            <h4>1. Acceptation des conditions</h4>
            <p>En créant un compte sur la plateforme INSTI, vous acceptez les présentes conditions d'utilisation.</p>
            
            <h4>2. Compte utilisateur</h4>
            <p>Vous êtes responsable de la confidentialité de vos identifiants de connexion.</p>
            
            <h4>3. Utilisation de la plateforme</h4>
            <p>La plateforme est destinée exclusivement au processus de recrutement des enseignants de l'INSTI.</p>
            
            <h4>4. Données personnelles</h4>
            <p>Vos données sont traitées conformément à notre politique de confidentialité.</p>
            
            <h4>5. Modifications</h4>
            <p>L'INSTI se réserve le droit de modifier ces conditions à tout moment.</p>
        `,
        privacy: `
            <h4>1. Collecte des données</h4>
            <p>Nous collectons les données nécessaires au processus de recrutement : identité, formation, expérience professionnelle.</p>
            
            <h4>2. Utilisation des données</h4>
            <p>Vos données sont utilisées exclusivement pour l'évaluation de votre candidature.</p>
            
            <h4>3. Conservation</h4>
            <p>Vos données sont conservées pendant la durée du processus de recrutement et conformément à la législation en vigueur.</p>
            
            <h4>4. Partage des données</h4>
            <p>Vos données ne sont partagées qu'avec les membres du comité de recrutement de l'INSTI.</p>
            
            <h4>5. Vos droits</h4>
            <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
        `
    };
    
    // Vérifier si une modale existe déjà
    let modal = document.getElementById('termsModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'termsModal';
        modal.className = 'modal-overlay show';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${titles[type]}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="terms-content">
                        ${content[type]}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary modal-close">J'ai compris</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Gestion de la fermeture
        const closeModal = () => modal.remove();
        
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

/**
 * Vérifier les paramètres d'URL
 */
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Pré-remplissage depuis l'inscription sociale
    const socialName = urlParams.get('social_name');
    const socialEmail = urlParams.get('social_email');
    
    if (socialName && socialEmail) {
        const nameField = document.getElementById('name');
        const firstNameField = document.getElementById('first_name');
        const emailField = document.getElementById('email');
        
        if (nameField && firstNameField && emailField) {
            // Séparer le nom complet
            const nameParts = socialName.split(' ');
            if (nameParts.length >= 2) {
                nameField.value = nameParts[0];
                firstNameField.value = nameParts.slice(1).join(' ');
            } else {
                nameField.value = socialName;
            }
            
            emailField.value = socialEmail;
            emailField.readOnly = true;
            
            // Nettoyer l'URL
            const url = new URL(window.location);
            url.searchParams.delete('social_name');
            url.searchParams.delete('social_email');
            window.history.replaceState({}, '', url);
        }
    }
}

/**
 * Gestion de la touche Entrée
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement.type !== 'textarea') {
        const registerForm = document.getElementById('registerForm');
        if (registerForm && validateRegistrationForm()) {
            submitRegistrationForm();
        }
    }
});
