/**
 * Page Connexion - INSTI Plateforme
 * Gestion du formulaire de connexion
 */

document.addEventListener('DOMContentLoaded', function() {
    initLoginPage();
});

function initLoginPage() {
    // Initialisation du formulaire
    initLoginForm();
    
    // Initialisation du toggle password
    initPasswordToggle();
    
    // Initialisation de la validation en temps réel
    initRealTimeValidation();
    
    // Initialisation du bouton "Mot de passe oublié"
    initForgotPassword();
    
    // Initialisation des réseaux sociaux
    initSocialLogin();
    
    // Vérifier les paramètres d'URL (messages de succès d'inscription, etc.)
    checkURLParams();
}

/**
 * Initialisation du formulaire de connexion
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateLoginForm()) {
            submitLoginForm();
        }
    });
}

/**
 * Validation du formulaire de connexion
 */
function validateLoginForm() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    let isValid = true;
    
    // Réinitialiser les erreurs
    clearErrors();
    
    // Validation de l'email
    if (!email.value.trim()) {
        showError(email, 'L\'adresse email est requise');
        isValid = false;
    } else if (!window.INSTI?.isValidEmail(email.value)) {
        showError(email, 'Veuillez entrer une adresse email valide');
        isValid = false;
    }
    
    // Validation du mot de passe
    if (!password.value.trim()) {
        showError(password, 'Le mot de passe est requis');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Le mot de passe doit contenir au moins 6 caractères');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Afficher une erreur
 */
function showError(input, message) {
    const formGroup = input.closest('.form-group');
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
    input.focus();
}

/**
 * Effacer toutes les erreurs
 */
function clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
        const error = group.querySelector('.error-message');
        if (error) error.remove();
    });
}

/**
 * Soumettre le formulaire de connexion
 */
function submitLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Afficher le chargement
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
    
    // Simulation d'envoi (remplacer par une vraie requête AJAX)
    setTimeout(() => {
        // Simuler une réponse du serveur
        const mockResponse = {
            success: true,
            message: 'Connexion réussie',
            redirect: '/teacher/dashboard'
        };
        
        if (mockResponse.success) {
            // Afficher un message de succès
            window.INSTI?.showToast(mockResponse.message, 'success');
            
            // Redirection
            setTimeout(() => {
                window.location.href = mockResponse.redirect;
            }, 1500);
        } else {
            // Afficher un message d'erreur
            window.INSTI?.showToast(mockResponse.message, 'error');
            
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }, 2000);
}

/**
 * Initialisation du toggle password
 */
function initPasswordToggle() {
    const toggleButton = document.getElementById('toggleLoginPassword');
    if (!toggleButton) return;
    
    const passwordInput = document.getElementById('login-password');
    
    toggleButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Changer l'icône
        const icon = this.querySelector('i');
        if (icon) {
            icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        }
    });
}

/**
 * Initialisation de la validation en temps réel
 */
function initRealTimeValidation() {
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() && !window.INSTI?.isValidEmail(this.value)) {
                showError(this, 'Veuillez entrer une adresse email valide');
            } else {
                clearError(this);
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.trim() && this.value.length < 6) {
                showError(this, 'Le mot de passe doit contenir au moins 6 caractères');
            } else {
                clearError(this);
            }
        });
    }
}

/**
 * Effacer l'erreur d'un champ
 */
function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('has-error');
        const error = formGroup.querySelector('.error-message');
        if (error) error.remove();
    }
}

/**
 * Initialisation du bouton "Mot de passe oublié"
 */
function initForgotPassword() {
    const forgotLink = document.querySelector('.forgot-password a');
    if (!forgotLink) return;
    
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        showForgotPasswordModal();
    });
}

/**
 * Afficher la modale de mot de passe oublié
 */
function showForgotPasswordModal() {
    // Vérifier si une modale existe déjà
    let modal = document.getElementById('forgotPasswordModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'forgotPasswordModal';
        modal.className = 'modal-overlay show';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Mot de passe oublié</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Entrez votre adresse email pour recevoir un lien de réinitialisation :</p>
                    <div class="form-group">
                        <input type="email" id="resetEmail" placeholder="votre.email@example.com" class="input-field">
                        <span class="error-message" id="resetEmailError"></span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-cancel">Annuler</button>
                    <button class="btn-primary" id="sendResetLink">Envoyer le lien</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Gestion de la fermeture
        const closeModal = () => modal.remove();
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Gestion de l'envoi du lien
        const sendButton = modal.querySelector('#sendResetLink');
        const emailInput = modal.querySelector('#resetEmail');
        const errorElement = modal.querySelector('#resetEmailError');
        
        sendButton.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (!email) {
                errorElement.textContent = 'L\'adresse email est requise';
                return;
            }
            
            if (!window.INSTI?.isValidEmail(email)) {
                errorElement.textContent = 'Veuillez entrer une adresse email valide';
                return;
            }
            
            // Simulation d'envoi
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            
            setTimeout(() => {
                window.INSTI?.showToast('Lien de réinitialisation envoyé à ' + email, 'success');
                closeModal();
            }, 1500);
        });
        
        // Validation en temps réel
        emailInput.addEventListener('input', function() {
            if (this.value.trim() && !window.INSTI?.isValidEmail(this.value)) {
                errorElement.textContent = 'Veuillez entrer une adresse email valide';
            } else {
                errorElement.textContent = '';
            }
        });
    }
}

/**
 * Initialisation de la connexion via réseaux sociaux
 */
function initSocialLogin() {
    const socialButtons = document.querySelectorAll('.social-login-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const provider = this.dataset.provider;
            initiateSocialLogin(provider);
        });
    });
}

/**
 * Initier la connexion sociale
 */
function initiateSocialLogin(provider) {
    // Afficher le chargement
    const button = document.querySelector(`.social-login-btn[data-provider="${provider}"]`);
    if (button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connexion...`;
        button.disabled = true;
    }
    
    // URLs de redirection OAuth (à configurer selon votre backend)
    const oauthUrls = {
        google: '/auth/google',
        facebook: '/auth/facebook',
        linkedin: '/auth/linkedin'
    };
    
    const url = oauthUrls[provider];
    if (url) {
        // Redirection vers le provider OAuth
        window.location.href = url;
    } else {
        // Simulation pour la démo
        setTimeout(() => {
            if (button) {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }
            window.INSTI?.showToast(`Connexion ${provider} en cours de développement`, 'info');
        }, 1000);
    }
}

/**
 * Vérifier les paramètres d'URL
 */
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Message de succès d'inscription
    if (urlParams.get('registered') === 'success') {
        window.INSTI?.showToast('Inscription réussie ! Vous pouvez maintenant vous connecter.', 'success');
        
        // Nettoyer l'URL
        const url = new URL(window.location);
        url.searchParams.delete('registered');
        window.history.replaceState({}, '', url);
    }
    
    // Message de réinitialisation de mot de passe
    if (urlParams.get('reset') === 'success') {
        window.INSTI?.showToast('Mot de passe réinitialisé avec succès. Connectez-vous avec votre nouveau mot de passe.', 'success');
        
        // Nettoyer l'URL
        const url = new URL(window.location);
        url.searchParams.delete('reset');
        window.history.replaceState({}, '', url);
    }
    
    // Redirection après déconnexion
    if (urlParams.get('logout') === 'success') {
        window.INSTI?.showToast('Vous avez été déconnecté avec succès.', 'info');
        
        // Nettoyer l'URL
        const url = new URL(window.location);
        url.searchParams.delete('logout');
        window.history.replaceState({}, '', url);
    }
    
    // Auto-remplissage de l'email
    const emailParam = urlParams.get('email');
    if (emailParam) {
        const emailInput = document.getElementById('login-email');
        if (emailInput) {
            emailInput.value = decodeURIComponent(emailParam);
        }
    }
}

/**
 * Gestion de la touche Entrée
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement.type !== 'textarea') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm && validateLoginForm()) {
            submitLoginForm();
        }
    }
});
