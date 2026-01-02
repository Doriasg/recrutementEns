/**
 * INSTI - Plateforme de Recrutement
 * Fichier JavaScript principal - Fonctions globales
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants globaux
    initGlobalComponents();
    initTheme();
    initNotifications();
});

// ====================
// FONCTIONS GLOBALES
// ====================

/**
 * Initialisation des composants globaux
 */
function initGlobalComponents() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');
    
    if (menuToggle && headerMenu) {
        menuToggle.addEventListener('click', () => {
            headerMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (headerMenu && menuToggle && 
            !headerMenu.contains(e.target) && 
            !menuToggle.contains(e.target) &&
            headerMenu.classList.contains('active')) {
            headerMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Gestion des dropdowns
    initDropdowns();

    // Gestion des modales
    initModals();

    // Gestion des tooltips
    initTooltips();

    // Gestion des alertes auto-fermantes
    initAutoDismissAlerts();
}

/**
 * Gestion du thème (clair/sombre)
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!themeToggle) return;

    // Récupérer le thème sauvegardé
    const savedTheme = localStorage.getItem('insti-theme') || 'light';
    
    // Appliquer le thème
    applyTheme(savedTheme);

    // Écouter le clic sur le bouton de thème
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('insti-theme', newTheme);
    });

    // Écouter les changements de préférence système
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('insti-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Appliquer un thème spécifique
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

/**
 * Initialisation des notifications
 */
function initNotifications() {
    const notificationBell = document.getElementById('notificationItem');
    const notificationBadge = document.getElementById('notificationBadge');
    
    if (!notificationBell || !notificationBadge) return;

    // Simuler le chargement des notifications
    loadNotifications();

    // Marquer comme lues au clic
    notificationBell.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Réinitialiser le badge
        notificationBadge.textContent = '0';
        notificationBadge.style.display = 'none';
        
        // Ouvrir le panneau des notifications
        openNotificationPanel();
    });
}

/**
 * Charger les notifications
 */
function loadNotifications() {
    // Simulation - en production, ce serait une requête AJAX
    setTimeout(() => {
        const notificationCount = Math.floor(Math.random() * 5);
        const notificationBadge = document.getElementById('notificationBadge');
        
        if (notificationBadge && notificationCount > 0) {
            notificationBadge.textContent = notificationCount;
            notificationBadge.style.display = 'flex';
            
            // Ajouter une animation
            notificationBadge.classList.add('pulse');
            setTimeout(() => {
                notificationBadge.classList.remove('pulse');
            }, 1000);
        }
    }, 2000);
}

/**
 * Ouvrir le panneau des notifications
 */
function openNotificationPanel() {
    // Créer ou afficher le panneau de notifications
    let panel = document.getElementById('notificationPanel');
    
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.className = 'notification-panel';
        panel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="close-panel">&times;</button>
            </div>
            <div class="notification-list">
                <div class="notification-item">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <p>Votre candidature a été acceptée</p>
                        <small>Il y a 2 heures</small>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <p>Document manquant dans votre dossier</p>
                        <small>Il y a 1 jour</small>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
        
        // Fermer le panneau
        panel.querySelector('.close-panel').addEventListener('click', () => {
            panel.remove();
        });
    }
    
    panel.classList.add('show');
}

/**
 * Initialisation des dropdowns
 */
function initDropdowns() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    });

    // Fermer les dropdowns en cliquant à l'extérieur
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });
}

/**
 * Initialisation des modales
 */
function initModals() {
    // Ouvrir les modales
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fermer les modales
    document.querySelectorAll('.modal-overlay, .modal-close, .modal-cancel').forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            if (e.target === this || this.classList.contains('modal-close') || 
                this.classList.contains('modal-cancel')) {
                
                const modal = this.closest('.modal-overlay');
                if (modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show').forEach(modal => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
    });
}

/**
 * Initialisation des tooltips
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
}

/**
 * Alertes auto-fermantes
 */
function initAutoDismissAlerts() {
    document.querySelectorAll('.alert-auto-dismiss').forEach(alert => {
        const delay = alert.getAttribute('data-dismiss-delay') || 5000;
        
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, parseInt(delay));
    });
}

/**
 * Formatage de date
 */
function formatDate(dateString, format = 'long') {
    const date = new Date(dateString);
    const options = format === 'short' ? {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    } : {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    return date.toLocaleDateString('fr-FR', options);
}

/**
 * Formatage de nombre
 */
function formatNumber(number) {
    return new Intl.NumberFormat('fr-FR').format(number);
}

/**
 * Vérification de la force du mot de passe
 */
function checkPasswordStrength(password) {
    let score = 0;
    
    // Longueur minimale
    if (password.length >= 8) score++;
    
    // Contient une majuscule
    if (/[A-Z]/.test(password)) score++;
    
    // Contient un chiffre
    if (/[0-9]/.test(password)) score++;
    
    // Contient un caractère spécial
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return score;
}

/**
 * Copier du texte dans le presse-papier
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Texte copié dans le presse-papier');
    }).catch(err => {
        console.error('Erreur lors de la copie : ', err);
    });
}

/**
 * Afficher un toast (notification temporaire)
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/**
 * Défilement fluide vers un élément
 */
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Validation d'email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validation de téléphone
 */
function isValidPhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return re.test(phone);
}

// ====================
// EXPORT DES FONCTIONS
// ====================
window.INSTI = {
    formatDate,
    formatNumber,
    checkPasswordStrength,
    copyToClipboard,
    showToast,
    smoothScrollTo,
    isValidEmail,
    isValidPhone
};

// ====================
// GESTION DES ERREURS
// ====================
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript :', e.error);
    
    // Envoyer l'erreur au serveur en production
    if (window.location.hostname !== 'localhost') {
        // Logique d'envoi d'erreur
    }
});

// ====================
// POLYFILLS
// ====================
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        }
        return this.indexOf(search, start) !== -1;
    };
}
