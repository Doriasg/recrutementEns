/**
 * Dashboard Examinateur - INSTI Plateforme
 * Gestion du tableau de bord examinateur
 */

document.addEventListener('DOMContentLoaded', function() {
    initExaminerDashboard();
});

function initExaminerDashboard() {
    // Initialisation des statistiques
    initExaminerStats();
    
    // Initialisation des évaluations
    initEvaluations();
    
    // Initialisation des graphiques
    initExaminerCharts();
    
    // Initialisation des notifications
    initExaminerNotifications();
    
    // Initialisation des actions rapides
    initExaminerQuickActions();
    
    // Initialisation des mises à jour en temps réel
    initExaminerRealTime();
    
    // Initialisation du filtrage
    initExaminerFiltering();
}

/**
 * Initialisation des statistiques
 */
function initExaminerStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    // Animation des chiffres
    statCards.forEach(card => {
        const numberElement = card.querySelector('.stat-number');
        if (numberElement) {
            animateNumber(numberElement);
        }
    });
    
    // Mise à jour périodique
    setInterval(updateExaminerStats, 30000);
}

/**
 * Animer un nombre
 */
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 800;
    const step = 20;
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
 * Mettre à jour les statistiques de l'examinateur
 */
function updateExaminerStats() {
    // Simulation de mise à jour
    const stats = {
        pending: Math.floor(Math.random() * 3) + 10,
        completed: Math.floor(Math.random() * 5) + 25,
        totalCandidates: Math.floor(Math.random() * 10) + 150,
        completionRate: Math.floor(Math.random() * 10) + 65
    };
    
    // Mettre à jour l'affichage
    updateStatElement('pendingEvaluations', stats.pending);
    updateStatElement('completedEvaluations', stats.completed);
    updateStatElement('totalCandidates', stats.totalCandidates);
    updateStatElement('completionRate', stats.completionRate);
}

/**
 * Mettre à jour un élément de statistique
 */
function updateStatElement(statId, newValue) {
    const element = document.querySelector(`[data-stat="${statId}"]`);
    if (element) {
        const oldValue = parseInt(element.textContent.replace('%', ''));
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
            element.textContent = element.textContent.includes('%') ? `${newValue}%` : newValue;
            clearInterval(timer);
            
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 1000);
        } else {
            element.textContent = Math.floor(current);
        }
    }, step);
}

/**
 * Initialisation des évaluations
 */
function initEvaluations() {
    const evaluationCards = document.querySelectorAll('.evaluation-card');
    
    evaluationCards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Bouton "Évaluer"
        const evaluateBtn = card.querySelector('.btn-evaluate');
        if (evaluateBtn) {
            evaluateBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const evaluationId = this.closest('.evaluation-card').dataset.evaluationId;
                if (evaluationId) {
                    startEvaluation(evaluationId, card);
                }
            });
        }
        
        // Bouton "Profil"
        const viewBtn = card.querySelector('.btn-view');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const candidateId = this.closest('.evaluation-card').dataset.candidateId;
                if (candidateId) {
                    viewCandidateProfile(candidateId);
                }
            });
        }
        
        // Vérifier l'urgence
        checkEvaluationUrgency(card);
    });
}

/**
 * Vérifier l'urgence d'une évaluation
 */
function checkEvaluationUrgency(card) {
    const deadline = card.dataset.deadline;
    if (!deadline) return;
    
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const statusBadge = card.querySelector('.evaluation-status');
    if (!statusBadge) return;
    
    if (diffDays <= 1) {
        statusBadge.classList.add('status-urgent');
        statusBadge.innerHTML = '<i class="fas fa-exclamation-circle"></i> Très urgent';
        
        // Animation de pulsation
        statusBadge.style.animation = 'pulse 1s infinite';
    } else if (diffDays <= 3) {
        statusBadge.classList.add('status-high');
        statusBadge.innerHTML = '<i class="fas fa-clock"></i> Haute priorité';
    }
}

/**
 * Démarrer une évaluation
 */
function startEvaluation(evaluationId, card) {
    // Simuler le chargement
    const evaluateBtn = card.querySelector('.btn-evaluate');
    const originalText = evaluateBtn.innerHTML;
    
    evaluateBtn.disabled = true;
    evaluateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ouverture...';
    
    // Simulation d'ouverture
    setTimeout(() => {
        evaluateBtn.disabled = false;
        evaluateBtn.innerHTML = originalText;
        
        // Ouvrir la page d'évaluation
        window.location.href = `/examiner/evaluation/${evaluationId}`;
    }, 500);
}

/**
 * Voir le profil d'un candidat
 */
function viewCandidateProfile(candidateId) {
    // Ouvrir dans un nouvel onglet
    window.open(`/examiner/candidate/${candidateId}`, '_blank');
}

/**
 * Initialisation des graphiques
 */
function initExaminerCharts() {
    if (typeof Chart === 'undefined') return;
    
    // Graphique des évaluations par statut
    const statusChartCtx = document.getElementById('evaluationsByStatusChart');
    if (statusChartCtx) {
        new Chart(statusChartCtx, {
            type: 'pie',
            data: {
                labels: ['Acceptés', 'En révision', 'Rejetés', 'En attente'],
                datasets: [{
                    data: [18, 42, 25, 15],
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#6b7280'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Graphique de productivité
    const productivityChartCtx = document.getElementById('productivityChart');
    if (productivityChartCtx) {
        new Chart(productivityChartCtx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'Évaluations terminées',
                    data: [3, 5, 2, 6, 4, 1, 0],
                    borderColor: '#0a3f8f',
                    backgroundColor: 'rgba(10, 63, 143, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre d\'évaluations'
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
function initExaminerNotifications() {
    const notificationItems = document.querySelectorAll('.notification-item');
    const notificationBadge = document.querySelector('#notificationBadge');
    
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
                this.classList.add('read');
                updateNotificationBadge();
                
                // Marquer comme lue
                const notificationId = this.dataset.notificationId;
                if (notificationId) {
                    markNotificationAsRead(notificationId);
                }
            }
        });
    });
    
    // Mettre à jour le badge
    updateNotificationBadge();
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
    console.log('Notification marquée comme lue:', notificationId);
    
    // Mettre à jour localStorage
    let readNotifications = JSON.parse(localStorage.getItem('insti_examiner_read_notifications') || '[]');
    if (!readNotifications.includes(notificationId)) {
        readNotifications.push(notificationId);
        localStorage.setItem('insti_examiner_read_notifications', JSON.stringify(readNotifications));
    }
}

/**
 * Initialisation des actions rapides
 */
function initExaminerQuickActions() {
    const actionItems = document.querySelectorAll('.action-item');
    
    actionItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.href) return;
            
            e.preventDefault();
            
            const action = this.dataset.action;
            if (action) {
                executeExaminerAction(action, this);
            }
        });
    });
}

/**
 * Exécuter une action d'examinateur
 */
function executeExaminerAction(action, element) {
    switch(action) {
        case 'start_batch':
            startBatchEvaluation();
            break;
        case 'export_data':
            exportEvaluationData();
            break;
        case 'set_availability':
            setAvailability();
            break;
        case 'view_reports':
            viewReports();
            break;
    }
    
    // Animation de confirmation
    element.classList.add('executed');
    setTimeout(() => element.classList.remove('executed'), 1000);
}

/**
 * Démarrer une évaluation par lot
 */
function startBatchEvaluation() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Évaluation par lot</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Sélectionnez les critères pour l'évaluation par lot :</p>
                <div class="form-group">
                    <label>Département</label>
                    <select id="batchDepartment">
                        <option value="">Tous les départements</option>
                        <option value="electrique">Génie Électrique</option>
                        <option value="informatique">Informatique</option>
                        <option value="mecanique">Génie Mécanique</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nombre de candidatures</label>
                    <input type="number" id="batchCount" min="1" max="20" value="5">
                </div>
                <div class="form-group">
                    <label>Critères pré-définis</label>
                    <select id="batchCriteria">
                        <option value="standard">Standard</option>
                        <option value="strict">Strict</option>
                        <option value="flexible">Flexible</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="startBatch">Démarrer</button>
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
    
    // Démarrer l'évaluation par lot
    modal.querySelector('#startBatch').addEventListener('click', function() {
        const department = modal.querySelector('#batchDepartment').value;
        const count = modal.querySelector('#batchCount').value;
        const criteria = modal.querySelector('#batchCriteria').value;
        
        closeModal();
        
        // Simulation
        window.INSTI?.showToast(
            `Évaluation par lot démarrée (${count} candidatures, ${criteria})`,
            'success'
        );
        
        // Redirection vers la page d'évaluation par lot
        setTimeout(() => {
            window.location.href = `/examiner/batch-evaluation?department=${department}&count=${count}&criteria=${criteria}`;
        }, 1000);
    });
}

/**
 * Exporter les données d'évaluation
 */
function exportEvaluationData() {
    // Simulation d'export
    const exportBtn = document.querySelector('[data-action="export_data"]');
    if (exportBtn) {
        const originalText = exportBtn.innerHTML;
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Export...';
        exportBtn.disabled = true;
        
        setTimeout(() => {
            // Créer un fichier CSV fictif
            const csvContent = "data:text/csv;charset=utf-8," 
                + "ID,Nom,Score,Statut,Département\n"
                + "1,ADJOVI Jean,85,En attente,Génie Électrique\n"
                + "2,KOFFI Mensah,72,En cours,Informatique\n"
                + "3,AMOUSSOU Kévin,65,En attente,Génie Mécanique";
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "evaluations_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
            
            window.INSTI?.showToast('Export terminé', 'success');
        }, 1500);
    }
}

/**
 * Définir la disponibilité
 */
function setAvailability() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Définir ma disponibilité</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Indiquez votre disponibilité pour les prochains jours :</p>
                <div class="availability-grid">
                    ${['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(day => `
                        <div class="availability-day">
                            <label>${day}</label>
                            <select class="availability-select">
                                <option value="full">Disponible</option>
                                <option value="partial">Partiellement</option>
                                <option value="none">Indisponible</option>
                            </select>
                        </div>
                    `).join('')}
                </div>
                <div class="form-group">
                    <label>Nombre maximum d'évaluations par jour</label>
                    <input type="number" id="maxEvaluations" min="1" max="20" value="8">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="saveAvailability">Enregistrer</button>
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
    
    // Sauvegarder la disponibilité
    modal.querySelector('#saveAvailability').addEventListener('click', function() {
        const availability = {};
        modal.querySelectorAll('.availability-day').forEach(dayElement => {
            const day = dayElement.querySelector('label').textContent;
            const status = dayElement.querySelector('select').value;
            availability[day] = status;
        });
        
        const maxEvaluations = modal.querySelector('#maxEvaluations').value;
        
        // Sauvegarder
        localStorage.setItem('insti_examiner_availability', JSON.stringify({
            availability,
            maxEvaluations,
            updatedAt: new Date().toISOString()
        }));
        
        closeModal();
        window.INSTI?.showToast('Disponibilité enregistrée', 'success');
    });
}

/**
 * Voir les rapports
 */
function viewReports() {
    window.location.href = '/examiner/reports';
}

/**
 * Initialisation des mises à jour en temps réel
 */
function initExaminerRealTime() {
    // Vérifier les nouvelles évaluations
    setInterval(checkNewEvaluations, 60000);
    
    // Écouter les événements
    document.addEventListener('evaluationAssigned', handleNewEvaluation);
    document.addEventListener('evaluationCompleted', handleEvaluationCompleted);
}

/**
 * Vérifier les nouvelles évaluations
 */
function checkNewEvaluations() {
    // Simulation
    const hasNew = Math.random() < 0.2;
    
    if (hasNew) {
        const fakeEvaluation = {
            id: Date.now(),
            candidate: 'Nouveau candidat',
            department: 'Génie Électrique',
            score: Math.floor(Math.random() * 30) + 60,
            priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        };
        
        document.dispatchEvent(new CustomEvent('evaluationAssigned', {
            detail: fakeEvaluation
        }));
    }
}

/**
 * Gérer une nouvelle évaluation
 */
function handleNewEvaluation(e) {
    const evaluation = e.detail;
    
    // Ajouter à la liste
    addEvaluationToList(evaluation);
    
    // Mettre à jour les statistiques
    updateExaminerStats();
    
    // Afficher une notification
    const notification = {
        id: Date.now(),
        title: 'Nouvelle évaluation assignée',
        message: `${evaluation.candidate} - ${evaluation.department}`,
        type: 'info',
        time: new Date().toISOString()
    };
    
    addNotification(notification);
}

/**
 * Ajouter une évaluation à la liste
 */
function addEvaluationToList(evaluation) {
    const evaluationsList = document.querySelector('.evaluations-list');
    if (!evaluationsList) return;
    
    const priorityClass = evaluation.priority === 'high' ? 'status-urgent' : 
                         evaluation.priority === 'medium' ? 'status-high' : 'status-normal';
    
    const priorityText = evaluation.priority === 'high' ? 'Urgent' : 
                        evaluation.priority === 'medium' ? 'Haute' : 'Normale';
    
    const evaluationCard = document.createElement('div');
    evaluationCard.className = 'evaluation-card';
    evaluationCard.dataset.evaluationId = evaluation.id;
    evaluationCard.dataset.candidateId = evaluation.id;
    evaluationCard.innerHTML = `
        <div class="evaluation-header">
            <div class="candidate-info">
                <div class="candidate-avatar">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div>
                    <h3 class="candidate-name">${evaluation.candidate}</h3>
                    <div class="candidate-meta">
                        <span><i class="fas fa-graduation-cap"></i> ${evaluation.department}</span>
                        <span><i class="far fa-calendar"></i> Assigné à l'instant</span>
                    </div>
                </div>
            </div>
            <div class="evaluation-status ${priorityClass}">
                <i class="fas fa-${evaluation.priority === 'high' ? 'exclamation-circle' : 'clock'}"></i> ${priorityText}
            </div>
        </div>
        <div class="evaluation-details">
            <div class="detail-item">
                <span>Score préliminaire:</span>
                <span class="score-${evaluation.score >= 80 ? 'high' : evaluation.score >= 60 ? 'medium' : 'low'}">${evaluation.score}/100</span>
            </div>
        </div>
        <div class="evaluation-actions">
            <a href="#" class="btn-evaluate">
                <i class="fas fa-edit"></i> Évaluer
            </a>
            <a href="#" class="btn-view">
                <i class="fas fa-eye"></i> Profil
            </a>
        </div>
    `;
    
    // Ajouter au début de la liste
    evaluationsList.insertBefore(evaluationCard, evaluationsList.firstChild);
    
    // Initialiser les événements
    initEvaluationCardEvents(evaluationCard);
}

/**
 * Initialiser les événements d'une carte d'évaluation
 */
function initEvaluationCardEvents(card) {
    // Animation au survol
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    
    // Boutons
    const evaluateBtn = card.querySelector('.btn-evaluate');
    const viewBtn = card.querySelector('.btn-view');
    
    if (evaluateBtn) {
        evaluateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const evaluationId = card.dataset.evaluationId;
            startEvaluation(evaluationId, card);
        });
    }
    
    if (viewBtn) {
        viewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const candidateId = card.dataset.candidateId;
            viewCandidateProfile(candidateId);
        });
    }
}

/**
 * Ajouter une notification
 */
function addNotification(notification) {
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
    
    notificationsList.insertBefore(notificationElement, notificationsList.firstChild);
    
    // Initialiser les événements
    notificationElement.addEventListener('click', function() {
        if (this.classList.contains('unread')) {
            this.classList.remove('unread');
            this.classList.add('read');
            updateNotificationBadge();
        }
    });
    
    // Mettre à jour le badge
    updateNotificationBadge();
    
    // Afficher un toast
    window.INSTI?.showToast(notification.message, notification.type);
}

/**
 * Gérer une évaluation terminée
 */
function handleEvaluationCompleted(e) {
    const evaluation = e.detail;
    
    // Mettre à jour les statistiques
    updateExaminerStats();
    
    // Notification
    window.INSTI?.showToast(
        `Évaluation de ${evaluation.candidate} terminée`,
        'success'
    );
}

/**
 * Initialisation du filtrage
 */
function initExaminerFiltering() {
    const filterElements = document.querySelectorAll('#filterStatus, #filterDepartment, #filterPriority');
    
    filterElements.forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterEvaluations);
        }
    });
}

/**
 * Filtrer les évaluations
 */
function filterEvaluations() {
    const status = document.getElementById('filterStatus')?.value || 'all';
    const department = document.getElementById('filterDepartment')?.value || 'all';
    const priority = document.getElementById('filterPriority')?.value || 'all';
    
    const evaluationCards = document.querySelectorAll('.evaluation-card');
    
    evaluationCards.forEach(card => {
        const cardStatus = getCardStatus(card);
        const cardDepartment = card.dataset.department || '';
        const cardPriority = getCardPriority(card);
        
        let show = true;
        
        // Filtre par statut
        if (status !== 'all' && status !== cardStatus) {
            show = false;
        }
        
        // Filtre par département
        if (department !== 'all' && department !== cardDepartment) {
            show = false;
        }
        
        // Filtre par priorité
        if (priority !== 'all' && priority !== cardPriority) {
            show = false;
        }
        
        card.style.display = show ? '' : 'none';
    });
    
    // Mettre à jour le compteur
    updateEvaluationsCount();
}

/**
 * Obtenir le statut d'une carte
 */
function getCardStatus(card) {
    // Simulation - dans la réalité, ce serait basé sur les données
    const random = Math.random();
    if (random < 0.3) return 'pending';
    if (random < 0.6) return 'in_progress';
    return 'completed';
}

/**
 * Obtenir la priorité d'une carte
 */
function getCardPriority(card) {
    const statusElement = card.querySelector('.evaluation-status');
    if (!statusElement) return 'normal';
    
    if (statusElement.classList.contains('status-urgent')) return 'urgent';
    if (statusElement.classList.contains('status-high')) return 'high';
    return 'normal';
}

/**
 * Mettre à jour le compteur d'évaluations
 */
function updateEvaluationsCount() {
    const visibleCards = document.querySelectorAll('.evaluation-card[style=""]');
    const countElement = document.querySelector('.evaluations-count');
    
    if (countElement) {
        countElement.textContent = `(${visibleCards.length})`;
    }
}

// Initialiser le filtrage au chargement
window.addEventListener('load', () => {
    updateEvaluationsCount();
});
