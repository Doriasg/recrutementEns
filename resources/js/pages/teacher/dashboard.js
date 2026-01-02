/**
 * Dashboard Enseignant - INSTI Plateforme
 * Gestion du tableau de bord enseignant
 */

document.addEventListener('DOMContentLoaded', function() {
    initTeacherDashboard();
});

function initTeacherDashboard() {
    // Initialisation des statistiques
    initDashboardStats();
    
    // Initialisation des graphiques
    initCharts();
    
    // Initialisation des notifications
    initNotifications();
    
    // Initialisation des candidatures récentes
    initRecentApplications();
    
    // Initialisation des actions rapides
    initQuickActions();
    
    // Initialisation des mises à jour en temps réel
    initRealTimeUpdates();
    
    // Initialisation du bouton de déconnexion
    initLogoutButton();
}

/**
 * Initialisation des statistiques
 */
function initDashboardStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    // Animation des chiffres
    statCards.forEach(card => {
        const numberElement = card.querySelector('.stat-number');
        if (numberElement) {
            animateNumber(numberElement);
        }
    });
    
    // Mise à jour périodique
    setInterval(updateStats, 30000); // Toutes les 30 secondes
}

/**
 * Animer un nombre
 */
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 1000; // 1 seconde
    const step = 20; // ms
    const increment = target / (duration / step);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, step);
}

/**
 * Mettre à jour les statistiques
 */
function updateStats() {
    // Simulation de mise à jour (remplacer par une requête AJAX)
    const stats = {
        activeApplications: Math.floor(Math.random() * 5) + 1,
        acceptedApplications: Math.floor(Math.random() * 3),
        pendingApplications: Math.floor(Math.random() * 4),
        offersViewed: Math.floor(Math.random() * 10) + 20
    };
    
    // Mettre à jour les éléments
    updateStatElement('activeApplications', stats.activeApplications);
    updateStatElement('acceptedApplications', stats.acceptedApplications);
    updateStatElement('pendingApplications', stats.pendingApplications);
    updateStatElement('offersViewed', stats.offersViewed);
}

/**
 * Mettre à jour un élément de statistique
 */
function updateStatElement(statId, newValue) {
    const element = document.querySelector(`[data-stat="${statId}"]`);
    if (element) {
        const oldValue = parseInt(element.textContent);
        if (oldValue !== newValue) {
            animateNumberChange(element, oldValue, newValue);
        }
    }
}

/**
 * Animer le changement de nombre
 */
function animateNumberChange(element, oldValue, newValue) {
    const duration = 500;
    const step = 20;
    const increment = (newValue - oldValue) / (duration / step);
    let current = oldValue;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= newValue) || (increment < 0 && current <= newValue)) {
            element.textContent = newValue;
            clearInterval(timer);
            
            // Ajouter une animation
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 1000);
        } else {
            element.textContent = Math.floor(current);
        }
    }, step);
}

/**
 * Initialisation des graphiques
 */
function initCharts() {
    // Vérifier si Chart.js est disponible
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js non chargé');
        return;
    }
    
    // Graphique des candidatures
    const applicationsCtx = document.getElementById('applicationsChart');
    if (applicationsCtx) {
        new Chart(applicationsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Acceptées', 'En examen', 'En attente', 'Rejetées'],
                datasets: [{
                    data: [1, 2, 0, 0],
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#3b82f6',
                        '#ef4444'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                }
            }
        });
    }
    
    // Graphique de progression
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        new Chart(progressCtx, {
            type: 'bar',
            data: {
                labels: ['Profil', 'Documents', 'Candidatures', 'Évaluations'],
                datasets: [{
                    data: [85, 70, 60, 40],
                    backgroundColor: [
                        '#0a3f8f',
                        '#3b82f6',
                        '#60a5fa',
                        '#93c5fd'
                    ],
                    borderWidth: 0,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

/**
 * Initialisation des notifications
 */
function initNotifications() {
    const notificationItems = document.querySelectorAll('.notification-item');
    const notificationBadge = document.querySelector('#notificationBadge');
    
    // Marquer comme lues au clic
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
                this.classList.add('read');
                
                // Mettre à jour le badge
                updateNotificationBadge();
                
                // Simuler l'envoi au serveur
                markNotificationAsRead(this.dataset.notificationId);
            }
        });
    });
    
    // Bouton "Marquer tout comme lu"
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            notificationItems.forEach(item => {
                item.classList.remove('unread');
                item.classList.add('read');
            });
            
            updateNotificationBadge();
            
            // Simuler l'envoi au serveur
            markAllNotificationsAsRead();
        });
    }
}

/**
 * Mettre à jour le badge de notifications
 */
function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('#notificationBadge');
    
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
            
            // Animation
            badge.classList.add('pulse');
            setTimeout(() => badge.classList.remove('pulse'), 1000);
        } else {
            badge.style.display = 'none';
        }
    }
}

/**
 * Marquer une notification comme lue
 */
function markNotificationAsRead(notificationId) {
    // Simulation d'envoi au serveur
    console.log('Notification marquée comme lue :', notificationId);
    
    // Mettre à jour localStorage
    let readNotifications = JSON.parse(localStorage.getItem('insti_read_notifications') || '[]');
    if (!readNotifications.includes(notificationId)) {
        readNotifications.push(notificationId);
        localStorage.setItem('insti_read_notifications', JSON.stringify(readNotifications));
    }
}

/**
 * Marquer toutes les notifications comme lues
 */
function markAllNotificationsAsRead() {
    // Simulation d'envoi au serveur
    console.log('Toutes les notifications marquées comme lues');
    
    // Mettre à jour localStorage
    const notificationIds = Array.from(document.querySelectorAll('.notification-item'))
        .map(item => item.dataset.notificationId)
        .filter(id => id);
    
    localStorage.setItem('insti_read_notifications', JSON.stringify(notificationIds));
}

/**
 * Initialisation des candidatures récentes
 */
function initRecentApplications() {
    const applicationCards = document.querySelectorAll('.application-card');
    
    applicationCards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Clic pour voir les détails
        card.addEventListener('click', function() {
            const applicationId = this.dataset.applicationId;
            if (applicationId) {
                window.location.href = `/teacher/application/${applicationId}`;
            }
        });
        
        // Mettre à jour le statut en temps réel
        const statusBadge = card.querySelector('.application-status');
        if (statusBadge) {
            simulateStatusUpdate(statusBadge, card.dataset.applicationId);
        }
    });
}

/**
 * Simuler une mise à jour de statut
 */
function simulateStatusUpdate(statusBadge, applicationId) {
    // Seulement pour les statuts "En examen"
    if (!statusBadge.classList.contains('status-pending')) return;
    
    // Chance de mise à jour : 10%
    if (Math.random() < 0.1) {
        setTimeout(() => {
            const newStatus = Math.random() < 0.7 ? 'status-accepted' : 'status-rejected';
            const statusText = newStatus === 'status-accepted' ? 'Acceptée' : 'Rejetée';
            
            // Mettre à jour le badge
            statusBadge.className = `application-status ${newStatus}`;
            statusBadge.textContent = statusText;
            
            // Afficher une notification
            const applicationTitle = statusBadge.closest('.application-card')
                .querySelector('.application-title')?.textContent || 'Votre candidature';
            
            window.INSTI?.showToast(
                `${applicationTitle} : ${statusText.toLowerCase()}`,
                newStatus === 'status-accepted' ? 'success' : 'error'
            );
            
            // Mettre à jour localStorage
            updateApplicationStatus(applicationId, newStatus);
        }, 5000 + Math.random() * 10000);
    }
}

/**
 * Mettre à jour le statut d'une candidature
 */
function updateApplicationStatus(applicationId, status) {
    let applications = JSON.parse(localStorage.getItem('insti_applications') || '[]');
    const appIndex = applications.findIndex(app => app.id === applicationId);
    
    if (appIndex !== -1) {
        applications[appIndex].status = status;
        applications[appIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('insti_applications', JSON.stringify(applications));
    }
}

/**
 * Initialisation des actions rapides
 */
function initQuickActions() {
    const actionItems = document.querySelectorAll('.action-item');
    
    actionItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.href) return; // Laisser le lien fonctionner normalement
            
            e.preventDefault();
            
            const action = this.dataset.action;
            if (action) {
                executeQuickAction(action, this);
            }
        });
    });
}

/**
 * Exécuter une action rapide
 */
function executeQuickAction(action, element) {
    switch(action) {
        case 'refresh':
            refreshDashboard();
            break;
        case 'new_application':
            startNewApplication();
            break;
        case 'upload_document':
            uploadDocument();
            break;
        case 'contact_support':
            contactSupport();
            break;
        default:
            console.log('Action non reconnue :', action);
    }
    
    // Animation de confirmation
    element.classList.add('executed');
    setTimeout(() => element.classList.remove('executed'), 1000);
}

/**
 * Rafraîchir le dashboard
 */
function refreshDashboard() {
    const dashboard = document.querySelector('.dashboard-content');
    
    // Animation de chargement
    dashboard.style.opacity = '0.5';
    
    // Simuler le rafraîchissement
    setTimeout(() => {
        updateStats();
        dashboard.style.opacity = '1';
        window.INSTI?.showToast('Dashboard rafraîchi', 'success');
    }, 1000);
}

/**
 * Démarrer une nouvelle candidature
 */
function startNewApplication() {
    // Récupérer les offres disponibles
    const availableOffers = getAvailableOffers();
    
    if (availableOffers.length === 0) {
        window.INSTI?.showToast('Aucune offre disponible pour le moment', 'info');
        return;
    }
    
    // Ouvrir une modale de sélection d'offre
    showOfferSelectionModal(availableOffers);
}

/**
 * Obtenir les offres disponibles
 */
function getAvailableOffers() {
    // Simulation (remplacer par une requête AJAX)
    return [
        { id: 1, title: 'Enseignant en Génie Électrique', department: 'Génie Électrique', deadline: '2024-01-15' },
        { id: 2, title: 'Enseignant en Informatique', department: 'Informatique', deadline: '2024-01-31' }
    ];
}

/**
 * Afficher la modale de sélection d'offre
 */
function showOfferSelectionModal(offers) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Choisir une offre</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Sélectionnez l'offre pour laquelle vous souhaitez postuler :</p>
                <div class="offers-list-modal">
                    ${offers.map(offer => `
                        <div class="offer-item-modal" data-offer-id="${offer.id}">
                            <h4>${offer.title}</h4>
                            <p>Département : ${offer.department}</p>
                            <p>Date limite : ${new Date(offer.deadline).toLocaleDateString('fr-FR')}</p>
                            <button class="btn-select-offer">Postuler</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestion de la fermeture
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Gestion de la sélection
    modal.querySelectorAll('.btn-select-offer').forEach(button => {
        button.addEventListener('click', function() {
            const offerId = this.closest('.offer-item-modal').dataset.offerId;
            modal.remove();
            
            // Rediriger vers le formulaire de candidature
            window.location.href = `/teacher/application/form?offer_id=${offerId}`;
        });
    });
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
        
        // Afficher une modale de progression
        showUploadProgressModal(files);
    });
    
    input.click();
}

/**
 * Afficher la modale de progression d'upload
 */
function showUploadProgressModal(files) {
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
                <div class="files-list"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const progressFill = modal.querySelector('.progress-fill');
    const progressText = modal.querySelector('.progress-text');
    const filesList = modal.querySelector('.files-list');
    
    // Simuler l'upload
    simulateUpload(files, progressFill, progressText, filesList, modal);
    
    // Gestion de la fermeture
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * Simuler l'upload de fichiers
 */
function simulateUpload(files, progressFill, progressText, filesList, modal) {
    let uploaded = 0;
    const total = files.length;
    
    files.forEach((file, index) => {
        // Afficher le fichier dans la liste
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item-upload';
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
            </div>
            <div class="file-status">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        `;
        filesList.appendChild(fileItem);
        
        // Simuler l'upload avec un délai
        setTimeout(() => {
            uploaded++;
            const progress = (uploaded / total) * 100;
            
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            
            // Mettre à jour le statut du fichier
            const fileStatus = fileItem.querySelector('.file-status');
            fileStatus.innerHTML = '<i class="fas fa-check text-success"></i>';
            
            // Si tous les fichiers sont uploadés
            if (uploaded === total) {
                setTimeout(() => {
                    modal.remove();
                    window.INSTI?.showToast(`${total} document(s) téléchargé(s) avec succès`, 'success');
                }, 1000);
            }
        }, 1000 * (index + 1));
    });
}

/**
 * Contacter le support
 */
function contactSupport() {
    window.location.href = '/contact';
}

/**
 * Initialisation des mises à jour en temps réel
 */
function initRealTimeUpdates() {
    // Vérifier les mises à jour toutes les minutes
    setInterval(checkForUpdates, 60000);
    
    // Écouter les événements personnalisés
    document.addEventListener('applicationStatusUpdated', (e) => {
        updateApplicationCard(e.detail);
    });
    
    document.addEventListener('newNotification', (e) => {
        addNewNotification(e.detail);
    });
}

/**
 * Vérifier les mises à jour
 */
function checkForUpdates() {
    // Simulation de vérification
    const hasUpdates = Math.random() < 0.3;
    
    if (hasUpdates) {
        // Simuler une notification
        const fakeNotification = {
            id: Date.now(),
            title: 'Mise à jour disponible',
            message: 'Votre dashboard a été mis à jour',
            type: 'info',
            time: new Date().toISOString()
        };
        
        document.dispatchEvent(new CustomEvent('newNotification', {
            detail: fakeNotification
        }));
    }
}

/**
 * Ajouter une nouvelle notification
 */
function addNewNotification(notification) {
    const notificationsList = document.querySelector('.notifications-list');
    if (!notificationsList) return;
    
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification-item unread';
    notificationElement.dataset.notificationId = notification.id;
    notificationElement.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${notification.type === 'info' ? 'info-circle' : 'exclamation-triangle'}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${notification.title}</div>
            <div class="notification-desc">${notification.message}</div>
            <div class="notification-time">À l'instant</div>
        </div>
        <div class="notification-dot"></div>
    `;
    
    // Ajouter au début de la liste
    notificationsList.insertBefore(notificationElement, notificationsList.firstChild);
    
    // Mettre à jour le badge
    updateNotificationBadge();
    
    // Afficher une notification toast
    window.INSTI?.showToast(notification.message, notification.type);
}

/**
 * Mettre à jour une carte de candidature
 */
function updateApplicationCard(detail) {
    const card = document.querySelector(`[data-application-id="${detail.applicationId}"]`);
    if (!card) return;
    
    const statusBadge = card.querySelector('.application-status');
    if (statusBadge && detail.status) {
        statusBadge.className = `application-status status-${detail.status}`;
        statusBadge.textContent = detail.statusText || detail.status;
    }
}

/**
 * Initialisation du bouton de déconnexion
 */
function initLogoutButton() {
    const logoutButton = document.querySelector('[data-action="logout"]');
    if (!logoutButton) return;
    
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        showLogoutConfirmation();
    });
}

/**
 * Afficher la confirmation de déconnexion
 */
function showLogoutConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Confirmer la déconnexion</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="confirmLogout">Se déconnecter</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestion de la fermeture
    const closeModal = () => modal.remove();
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Confirmation de déconnexion
    modal.querySelector('#confirmLogout').addEventListener('click', function() {
        // Simuler la déconnexion
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Déconnexion...';
        
        setTimeout(() => {
            // Nettoyer le localStorage
            localStorage.removeItem('insti_auth_token');
            localStorage.removeItem('insti_user_data');
            
            // Rediriger vers la page de connexion
            window.location.href = '/login?logout=success';
        }, 1000);
    });
}
