/**
 * Layout Auth - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initPasswordToggle();
    initFormValidation();
    initAuthAnimations();
    initRememberMe();
    initSocialButtons();
});

/**
 * Basculer la visibilité du mot de passe
 */
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
            
            // Focus sur l'input après le toggle
            input.focus();
        });
    });
}

/**
 * Validation des formulaires
 */
function initFormValidation() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateAuthForm(this)) {
                e.preventDefault();
                showFormErrors(this);
            }
        });
        
        // Validation en temps réel
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

/**
 * Valider un formulaire d'authentification
 */
function validateAuthForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Validation spécifique pour le mot de passe
    const password = form.querySelector('input[type="password"]');
    if (password && password.value.length < 8) {
        showFieldError(password, 'Le mot de passe doit contenir au moins 8 caractères');
        isValid = false;
    }
    
    // Validation pour la confirmation de mot de passe
    const confirmPassword = form.querySelector('input[name="password_confirmation"]');
    if (confirmPassword) {
        const password = form.querySelector('input[name="password"]');
        if (password && password.value !== confirmPassword.value) {
            showFieldError(confirmPassword, 'Les mots de passe ne correspondent pas');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Valider un champ individuel
 */
function validateField(field) {
    let isValid = true;
    const value = field.value.trim();
    
    // Réinitialiser les erreurs
    clearFieldError(field);
    
    // Validation basée sur le type
    switch(field.type) {
        case 'email':
            if (!value) {
                showFieldError(field, 'L\'email est obligatoire');
                isValid = false;
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Veuillez saisir un email valide');
                isValid = false;
            }
            break;
            
        case 'password':
            if (!value) {
                showFieldError(field, 'Le mot de passe est obligatoire');
                isValid = false;
            } else if (value.length < 8) {
                showFieldError(field, 'Minimum 8 caractères');
                isValid = false;
            }
            break;
            
        case 'text':
            if (!value && field.required) {
                showFieldError(field, 'Ce champ est obligatoire');
                isValid = false;
            }
            break;
            
        case 'tel':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Numéro de téléphone invalide');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

/**
 * Afficher une erreur sur un champ
 */
function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group') || field.closest('.field');
    if (!fieldGroup) return;
    
    // Retirer l'ancienne erreur
    const oldError = fieldGroup.querySelector('.error-message');
    if (oldError) oldError.remove();
    
    // Ajouter la nouvelle erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    
    fieldGroup.appendChild(errorDiv);
    field.classList.add('error');
}

/**
 * Effacer l'erreur d'un champ
 */
function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group') || field.closest('.field');
    if (!fieldGroup) return;
    
    const errorDiv = fieldGroup.querySelector('.error-message');
    if (errorDiv) errorDiv.remove();
    
    field.classList.remove('error');
}

/**
 * Afficher toutes les erreurs du formulaire
 */
function showFormErrors(form) {
    const firstError = form.querySelector('.error');
    if (firstError) {
        firstError.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Animation pour attirer l'attention
        firstError.style.animation = 'shake 0.5s';
        setTimeout(() => {
            firstError.style.animation = '';
        }, 500);
    }
}

/**
 * Animations spécifiques à l'authentification
 */
function initAuthAnimations() {
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        authCard.style.opacity = '0';
        authCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            authCard.style.transition = 'all 0.6s ease';
            authCard.style.opacity = '1';
            authCard.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animation des inputs
    const inputs = document.querySelectorAll('.input-with-icon input');
    inputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            input.style.transition = `all 0.4s ease ${index * 0.1}s`;
            input.style.opacity = '1';
            input.style.transform = 'translateX(0)';
        }, 500);
    });
}

/**
 * Gestion de "Se souvenir de moi"
 */
function initRememberMe() {
    const rememberCheckbox = document.getElementById('remember');
    if (!rememberCheckbox) return;
    
    // Récupérer la valeur sauvegardée
    const savedRemember = localStorage.getItem('insti-remember-me');
    if (savedRemember === 'true') {
        rememberCheckbox.checked = true;
        
        // Récupérer l'email sauvegardé
        const savedEmail = localStorage.getItem('insti-saved-email');
        const emailInput = document.getElementById('login-email');
        if (emailInput && savedEmail) {
            emailInput.value = savedEmail;
        }
    }
    
    // Sauvegarder au changement
    rememberCheckbox.addEventListener('change', function() {
        localStorage.setItem('insti-remember-me', this.checked);
        
        if (this.checked) {
            const emailInput = document.getElementById('login-email');
            if (emailInput && emailInput.value) {
                localStorage.setItem('insti-saved-email', emailInput.value);
            }
        } else {
            localStorage.removeItem('insti-saved-email');
        }
    });
}

/**
 * Gestion des boutons sociaux
 */
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-login-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.getAttribute('data-provider');
            
            // Animation de chargement
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            // Simulation de connexion sociale
            setTimeout(() => {
                alert(`Connexion avec ${provider} - À implémenter`);
                this.innerHTML = `<i class="fab fa-${provider}"></i> ${provider}`;
                this.disabled = false;
            }, 1500);
        });
    });
}

/**
 * Gestion du mot de passe oublié
 */
function initForgotPassword() {
    const forgotLink = document.querySelector('.forgot-password a');
    if (!forgotLink) return;
    
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Créer la modale de réinitialisation
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Réinitialisation du mot de passe</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
                    <div class="form-group">
                        <input type="email" id="reset-email" placeholder="votre@email.com" class="input-field">
                        <div class="error-message" id="reset-error"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-cancel">Annuler</button>
                    <button class="btn-primary" id="send-reset-link">Envoyer le lien</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Gestion de la fermeture
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        // Gestion de l'envoi
        modal.querySelector('#send-reset-link').addEventListener('click', function() {
            const email = modal.querySelector('#reset-email').value;
            const errorDiv = modal.querySelector('#reset-error');
            
            if (!email) {
                errorDiv.textContent = 'L\'email est obligatoire';
                return;
            }
            
            if (!isValidEmail(email)) {
                errorDiv.textContent = 'Email invalide';
                return;
            }
            
            // Simulation d'envoi
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            this.disabled = true;
            
            setTimeout(() => {
                modal.innerHTML = `
                    <div class="modal">
                        <div class="modal-body text-center">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Email envoyé !</h3>
                            <p>Un lien de réinitialisation a été envoyé à ${email}</p>
                            <button class="btn-primary" id="close-reset-modal">Fermer</button>
                        </div>
                    </div>
                `;
                
                modal.querySelector('#close-reset-modal').addEventListener('click', () => {
                    modal.remove();
                });
            }, 1500);
        });
    });
}

/**
 * Force du mot de passe en temps réel
 */
function initPasswordStrength() {
    const passwordInput = document.querySelector('input[name="password"]');
    if (!passwordInput) return;
    
    const strengthBar = document.createElement('div');
    strengthBar.className = 'password-strength';
    strengthBar.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill"></div>
        </div>
        <div class="strength-text">Faible</div>
    `;
    
    passwordInput.parentNode.appendChild(strengthBar);
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        
        const fill = strengthBar.querySelector('.strength-fill');
        const text = strengthBar.querySelector('.strength-text');
        
        // Mettre à jour la barre
        let percentage = 0;
        let strengthText = '';
        let color = '';
        
        switch(strength) {
            case 0:
                percentage = 0;
                strengthText = 'Très faible';
                color = '#ef4444';
                break;
            case 1:
                percentage = 25;
                strengthText = 'Faible';
                color = '#f59e0b';
                break;
            case 2:
                percentage = 50;
                strengthText = 'Moyen';
                color = '#f59e0b';
                break;
            case 3:
                percentage = 75;
                strengthText = 'Fort';
                color = '#10b981';
                break;
            case 4:
                percentage = 100;
                strengthText = 'Très fort';
                color = '#10b981';
                break;
        }
        
        fill.style.width = `${percentage}%`;
        fill.style.backgroundColor = color;
        text.textContent = strengthText;
        text.style.color = color;
    });
}

// Initialisation complète
window.addEventListener('load', function() {
    initForgotPassword();
    initPasswordStrength();
    
    // Focus sur le premier champ
    const firstInput = document.querySelector('input[type="email"], input[type="text"]');
    if (firstInput) {
        setTimeout(() => {
            firstInput.focus();
        }, 500);
    }
});
