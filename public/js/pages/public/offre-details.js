/**
 * Page Détails Offre - INSTI Plateforme
 * Gestion de la page de détails d'une offre
 */

document.addEventListener('DOMContentLoaded', function() {
    initOfferDetailsPage();
});

function initOfferDetailsPage() {
    // Initialisation du bouton de postulation
    initApplicationButton();
    
    // Initialisation du bouton de sauvegarde
    initSaveButton();
    
    // Initialisation du partage
    initSharing();
    
    // Initialisation de l'alerte de date limite
    initDeadlineAlert();
    
    // Initialisation des tabs
    initTabs();
    
    // Initialisation du compteur de jours restants
    initDaysCounter();
    
    // Initialisation du bouton d'impression
    initPrintButton();
}

/**
 * Initialisation du bouton de postulation
 */
function initApplicationButton() {
    const applyButton = document.getElementById('applyButton');
    if (!applyButton) return;
    
    applyButton.addEventListener('click', function(e) {
        // Si l'utilisateur n'est pas connecté
        if (this.href.includes('login')) {
            e.preventDefault();
            
            // Afficher une modale de connexion
            showLoginModal();
            return;
        }
        
        // Vérifier si l'offre est toujours ouverte
        const deadlineElement = document.querySelector('.deadline-date .date-value');
        if (deadlineElement) {
            const deadlineText = deadlineElement.textContent.trim();
            const deadlineDate = parseFrenchDate(deadlineText);
            const today = new Date();
            
            if (deadlineDate < today) {
                e.preventDefault();
                showAlert('Cette offre est fermée aux candidatures.', 'error');
                return;
            }
        }
        
        // Vérifier si l'utilisateur a déjà postulé
        const offerId = window.location.pathname.split('/').pop();
        const hasApplied = checkIfApplied(offerId);
        
        if (hasApplied) {
            e.preventDefault();
            showAlert('Vous avez déjà postulé à cette offre.', 'warning');
            return;
        }
    });
}

/**
 * Vérifier si l'utilisateur a déjà postulé
 */
function checkIfApplied(offerId) {
    const applications = JSON.parse(localStorage.getItem('insti_applications') || '[]');
    return applications.includes(offerId);
}

/**
 * Afficher une modale de connexion
 */
function showLoginModal() {
    // Vérifier si une modale existe déjà
    let modal = document.getElementById('loginModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'loginModal';
        modal.className = 'modal-overlay show';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Connexion requise</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Vous devez être connecté pour postuler à cette offre.</p>
                    <div class="modal-actions">
                        <a href="/login" class="btn-primary">Se connecter</a>
                        <a href="/register" class="btn-secondary">Créer un compte</a>
                        <button class="btn-text modal-cancel">Plus tard</button>
                    </div>
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
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

/**
 * Initialisation du bouton de sauvegarde
 */
function initSaveButton() {
    const saveButton = document.getElementById('saveButton');
    if (!saveButton) return;
    
    // Vérifier si l'offre est déjà sauvegardée
    const offerId = getOfferId();
    const isSaved = checkIfSaved(offerId);
    
    if (isSaved) {
        saveButton.classList.add('saved');
        saveButton.innerHTML = '<i class="fas fa-bookmark"></i> Sauvegardée';
    }
    
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const offerId = getOfferId();
        const offerTitle = document.querySelector('.offer-title')?.textContent || 'Cette offre';
        
        toggleSaveOffer(offerId, offerTitle, this);
    });
}

/**
 * Obtenir l'ID de l'offre
 */
function getOfferId() {
    return window.location.pathname.split('/').pop();
}

/**
 * Vérifier si l'offre est sauvegardée
 */
function checkIfSaved(offerId) {
    const savedOffers = JSON.parse(localStorage.getItem('insti_saved_offers') || '[]');
    return savedOffers.some(offer => offer.id === offerId);
}

/**
 * Basculer l'état de sauvegarde
 */
function toggleSaveOffer(offerId, offerTitle, button) {
    let savedOffers = JSON.parse(localStorage.getItem('insti_saved_offers') || '[]');
    const isSaved = savedOffers.some(offer => offer.id === offerId);
    
    if (isSaved) {
        // Retirer des sauvegardes
        savedOffers = savedOffers.filter(offer => offer.id !== offerId);
        button.classList.remove('saved');
        button.innerHTML = '<i class="far fa-bookmark"></i> Sauvegarder l\'offre';
        
        window.INSTI?.showToast('Offre retirée des sauvegardes', 'info');
    } else {
        // Ajouter aux sauvegardes
        const offerData = {
            id: offerId,
            title: offerTitle,
            savedAt: new Date().toISOString(),
            url: window.location.href
        };
        
        savedOffers.push(offerData);
        button.classList.add('saved');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Sauvegardée';
        
        window.INSTI?.showToast('Offre sauvegardée avec succès', 'success');
    }
    
    localStorage.setItem('insti_saved_offers', JSON.stringify(savedOffers));
    
    // Déclencher un événement personnalisé
    document.dispatchEvent(new CustomEvent('savedOffersUpdated'));
}

/**
 * Initialisation du partage
 */
function initSharing() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.platform;
            shareOffer(platform);
        });
    });
}

/**
 * Partager l'offre
 */
function shareOffer(platform) {
    const url = window.location.href;
    const title = document.querySelector('.offer-title')?.textContent || 'Offre INSTI';
    const text = `Découvrez cette offre sur la plateforme INSTI : ${title}`;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                window.INSTI?.showToast('Lien copié dans le presse-papier', 'success');
            });
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

/**
 * Initialisation de l'alerte de date limite
 */
function initDeadlineAlert() {
    const deadlineElement = document.querySelector('.deadline-date .date-value');
    if (!deadlineElement) return;
    
    const deadlineText = deadlineElement.textContent.trim();
    const deadlineDate = parseFrenchDate(deadlineText);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Mettre à jour le compteur de jours restants
    const daysElement = document.querySelector('.deadline-remaining span');
    if (daysElement) {
        if (diffDays < 0) {
            daysElement.textContent = 'offre expirée';
            daysElement.style.color = '#ef4444';
        } else if (diffDays <= 3) {
            daysElement.textContent = `il reste ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
            daysElement.style.color = '#f59e0b';
            showUrgentAlert(diffDays);
        } else {
            daysElement.textContent = `il reste ${diffDays} jours`;
        }
    }
}

/**
 * Afficher une alerte pour les offres urgentes
 */
function showUrgentAlert(daysLeft) {
    const alertContainer = document.getElementById('applicationAlert');
    if (!alertContainer) return;
    
    let message = '';
    let type = 'warning';
    
    if (daysLeft <= 0) {
        message = '⚠️ Cette offre est fermée aux candidatures';
        type = 'error';
    } else if (daysLeft === 1) {
        message = '⏰ Dernier jour pour postuler !';
        type = 'urgent';
    } else if (daysLeft <= 3) {
        message = `⏰ Plus que ${daysLeft} jours pour postuler`;
        type = 'warning';
    }
    
    if (message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alert);
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
    
    // Fallback: essayer de parser avec Date
    return new Date(dateString);
}

/**
 * Initialisation des tabs
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Retirer la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué et au contenu correspondant
            this.classList.add('active');
            document.getElementById(`${tabId}Tab`)?.classList.add('active');
            
            // Sauvegarder l'onglet actif
            localStorage.setItem('lastActiveTab', tabId);
        });
    });
    
    // Restaurer le dernier onglet actif
    const lastActiveTab = localStorage.getItem('lastActiveTab');
    if (lastActiveTab) {
        const tabButton = document.querySelector(`.tab-button[data-tab="${lastActiveTab}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }
}

/**
 * Initialisation du compteur de jours restants
 */
function initDaysCounter() {
    const counterElement = document.querySelector('.days-counter');
    if (!counterElement) return;
    
    const deadlineElement = document.querySelector('.deadline-date .date-value');
    if (!deadlineElement) return;
    
    const deadlineText = deadlineElement.textContent.trim();
    const deadlineDate = parseFrenchDate(deadlineText);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Mettre à jour le compteur tous les jours
    updateCounter(counterElement, diffDays);
    
    // Mettre à jour à minuit
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        updateCounter(counterElement, diffDays - 1);
        setInterval(() => {
            const newDiffDays = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));
            updateCounter(counterElement, newDiffDays);
        }, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
}

/**
 * Mettre à jour le compteur
 */
function updateCounter(element, days) {
    if (days < 0) {
        element.textContent = 'EXPIRÉE';
        element.classList.add('expired');
    } else if (days === 0) {
        element.textContent = "AUJOURD'HUI";
        element.classList.add('urgent');
    } else {
        element.textContent = `${days} jour${days > 1 ? 's' : ''}`;
        element.classList.remove('expired', 'urgent');
    }
}

/**
 * Initialisation du bouton d'impression
 */
function initPrintButton() {
    const printButton = document.getElementById('printButton');
    if (!printButton) return;
    
    printButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Créer une version imprimable
        const printContent = document.querySelector('.offer-content-grid').cloneNode(true);
        
        // Supprimer les éléments non nécessaires
        printContent.querySelectorAll('.status-actions, .apply-button, .save-button, .share-button, .no-print').forEach(el => {
            el.remove();
        });
        
        // Ajouter un titre d'impression
        const printTitle = document.createElement('h1');
        printTitle.textContent = document.querySelector('.offer-title')?.textContent || 'Offre d\'emploi';
        printTitle.style.textAlign = 'center';
        printTitle.style.marginBottom = '30px';
        printContent.prepend(printTitle);
        
        // Ajouter la date d'impression
        const printDate = document.createElement('p');
        printDate.textContent = `Imprimé le ${new Date().toLocaleDateString('fr-FR')}`;
        printDate.style.textAlign = 'right';
        printDate.style.fontSize = '12px';
        printDate.style.color = '#666';
        printContent.appendChild(printDate);
        
        // Ouvrir la fenêtre d'impression
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${document.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                    h1 { color: #0a3f8f; border-bottom: 2px solid #0a3f8f; padding-bottom: 10px; }
                    h2 { color: #333; margin-top: 30px; }
                    ul { margin-left: 20px; }
                    .section-title { background: #f8f9fa; padding: 10px; border-left: 4px solid #0a3f8f; }
                    @media print {
                        body { padding: 0; }
                        .no-print { display: none !important; }
                    }
                </style>
            </head>
            <body>
                ${printContent.outerHTML}
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
    });
}

/**
 * Afficher une alerte
 */
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('applicationAlert');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i> ${message}`;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Supprimer l'alerte après 5 secondes
    setTimeout(() => {
        alert.remove();
    }, 5000);
}
