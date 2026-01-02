/**
 * Layout Examiner - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initExaminerSidebar();
    initEvaluationQueue();
    initPrioritySystem();
    initQuickActions();
    initRealTimeUpdates();
    initFilters();
});

/**
 * Initialisation de la sidebar examinateur
 */
function initExaminerSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (!sidebar || !toggleBtn) return;

    // Toggle sidebar
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        this.classList.toggle('active');
        localStorage.setItem('examiner-sidebar-collapsed', sidebar.classList.contains('collapsed'));
    });

    // Restaurer l'état précédent
    const wasCollapsed = localStorage.getItem('examiner-sidebar-collapsed') === 'true';
    if (wasCollapsed) {
        sidebar.classList.add('collapsed');
        toggleBtn.classList.add('active');
    }

    // Navigation active
    const navItems = document.querySelectorAll('.sidebar-nav a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Statistiques en temps réel
    updateSidebarStats();
}

/**
 * Mettre à jour les statistiques de la sidebar
 */
function updateSidebarStats() {
    const statsItems = document.querySelectorAll('.stats-card li');
    
    statsItems.forEach(item => {
        const valueElement = item.querySelector('strong');
        if (!valueElement) return;

        const currentValue = parseInt(valueElement.textContent) || 0;
        const fluctuation = Math.floor(Math.random() * 3) - 1; // -1, 0, ou +1
        const newValue = Math.max(0, currentValue + fluctuation);

        if (newValue !== currentValue) {
            animateCounter(valueElement, currentValue, newValue, 500);
        }
    });
}

/**
 * Gestion de la file d'évaluation
 */
function initEvaluationQueue() {
    const queueItems = document.querySelectorAll('.evaluation-item');
    const startButtons = document.querySelectorAll('.start-evaluation');
    const completeButtons = document.querySelectorAll('.complete-evaluation');
    const deferButtons = document.querySelectorAll('.defer-evaluation');

    // Démarrer une évaluation
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.evaluation-item');
            if (!item) return;

            // Mettre à jour l'état
            item.classList.remove('pending');
            item.classList.add('in-progress');
            
            // Mettre à jour le texte
            const status = item.querySelector('.evaluation-status');
            if (status) {
                status.textContent = 'En cours';
                status.className = 'evaluation-status status-in-progress';
            }

            // Mettre à jour le bouton
            this.style.display = 'none';
            const completeBtn = item.querySelector('.complete-evaluation');
            if (completeBtn) {
                completeBtn.style.display = 'inline-flex';
            }

            // Enregistrer l'heure de début
            const startTime = new Date();
            item.dataset.startTime = startTime.toISOString();

            showToast('Évaluation démarrée', 'success');
        });
    });

    // Terminer une évaluation
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.evaluation-item');
            if (!item) return;

            // Calculer le temps passé
            const startTime = new Date(item.dataset.startTime);
            const endTime = new Date();
            const duration = Math.round((endTime - startTime) / 1000 / 60); // en minutes

            // Ouvrir le formulaire d'évaluation
            openEvaluationForm(item, duration);
        });
    });

    // Reporter une évaluation
    deferButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.evaluation-item');
            if (!item) return;

            openDeferModal(item);
        });
    });

    // Tri des évaluations
    initQueueSorting();
}

/**
 * Initialisation du tri de la file d'attente
 */
function initQueueSorting() {
    const sortSelect = document.getElementById('queueSort');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const queue = document.querySelector('.evaluations-queue');
        const items = Array.from(queue.querySelectorAll('.evaluation-item'));

        items.sort((a, b) => {
            switch(sortBy) {
                case 'priority':
                    const priorityA = getPriorityValue(a);
                    const priorityB = getPriorityValue(b);
                    return priorityB - priorityA;
                    
                case 'date':
                    const dateA = new Date(a.dataset.submissionDate || 0);
                    const dateB = new Date(b.dataset.submissionDate || 0);
                    return dateA - dateB;
                    
                case 'score':
                    const scoreA = parseFloat(a.dataset.score || 0);
                    const scoreB = parseFloat(b.dataset.score || 0);
                    return scoreB - scoreA;
                    
                default:
                    return 0;
            }
        });

        // Réorganiser les éléments
        items.forEach(item => queue.appendChild(item));
    });
}

/**
 * Obtenir la valeur numérique de la priorité
 */
function getPriorityValue(element) {
    const status = element.querySelector('.evaluation-status');
    if (!status) return 0;

    const statusClass = Array.from(status.classList).find(c => c.startsWith('status-'));
    if (!statusClass) return 0;

    switch(statusClass) {
        case 'status-urgent': return 3;
        case 'status-high': return 2;
        case 'status-normal': return 1;
        default: return 0;
    }
}

/**
 * Système de priorité
 */
function initPrioritySystem() {
    const priorityItems = document.querySelectorAll('[data-priority]');
    
    priorityItems.forEach(item => {
        const priority = item.getAttribute('data-priority');
        
        // Ajouter des indicateurs visuels
        switch(priority) {
            case 'urgent':
                item.style.borderLeft = '4px solid #ef4444';
                addPulseAnimation(item);
                break;
            case 'high':
                item.style.borderLeft = '4px solid #f59e0b';
                break;
            case 'normal':
                item.style.borderLeft = '4px solid #3b82f6';
                break;
        }

        // Tooltip de priorité
        item.setAttribute('title', `Priorité: ${getPriorityLabel(priority)}`);
    });

    // Mise à jour automatique des priorités
    setInterval(updatePriorities, 30000);
}

/**
 * Mettre à jour les priorités automatiquement
 */
function updatePriorities() {
    const items = document.querySelectorAll('.evaluation-item');
    
    items.forEach(item => {
        const submissionDate = new Date(item.dataset.submissionDate);
        const now = new Date();
        const hoursSinceSubmission = (now - submissionDate) / (1000 * 60 * 60);
        
        let newPriority = 'normal';
        if (hoursSinceSubmission > 48) {
            newPriority = 'urgent';
        } else if (hoursSinceSubmission > 24) {
            newPriority = 'high';
        }

        // Mettre à jour si nécessaire
        const currentPriority = item.getAttribute('data-priority');
        if (currentPriority !== newPriority) {
            item.setAttribute('data-priority', newPriority);
            updatePriorityVisual(item, newPriority);
        }
    });
}

/**
 * Mettre à jour l'apparence de la priorité
 */
function updatePriorityVisual(element, priority) {
    const statusElement = element.querySelector('.evaluation-status');
    if (!statusElement) return;

    // Mettre à jour les classes
    statusElement.className = 'evaluation-status';
    statusElement.classList.add(`status-${priority}`);
    
    // Mettre à jour le texte
    statusElement.textContent = getPriorityLabel(priority);
    
    // Mettre à jour la bordure
    switch(priority) {
        case 'urgent':
            element.style.borderLeftColor = '#ef4444';
            addPulseAnimation(element);
            break;
        case 'high':
            element.style.borderLeftColor = '#f59e0b';
            removePulseAnimation(element);
            break;
        case 'normal':
            element.style.borderLeftColor = '#3b82f6';
            removePulseAnimation(element);
            break;
    }

    showToast(`Priorité mise à jour: ${getPriorityLabel(priority)}`, 'info');
}

/**
 * Obtenir le libellé de priorité
 */
function getPriorityLabel(priority) {
    switch(priority) {
        case 'urgent': return 'Urgent';
        case 'high': return 'Haute';
        case 'normal': return 'Normale';
        default: return 'Normale';
    }
}

/**
 * Ajouter une animation de pulsation
 */
function addPulseAnimation(element) {
    element.style.animation = 'pulse 2s infinite';
}

/**
 * Retirer l'animation de pulsation
 */
function removePulseAnimation(element) {
    element.style.animation = '';
}

/**
 * Actions rapides
 */
function initQuickActions() {
    const quickActionButtons = document.querySelectorAll('.quick-action');
    
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const targetId = this.getAttribute('data-target');
            
            switch(action) {
                case 'start-all':
                    startAllEvaluations();
                    break;
                case 'complete-all':
                    completeAllInProgress();
                    break;
                case 'export':
                    exportEvaluations();
                    break;
                case 'statistics':
                    showStatistics();
                    break;
                case 'settings':
                    openSettings();
                    break;
            }
        });
    });
}

/**
 * Démarrer toutes les évaluations en attente
 */
function startAllEvaluations() {
    const pendingItems = document.querySelectorAll('.evaluation-item.pending');
    
    if (pendingItems.length === 0) {
        showToast('Aucune évaluation en attente', 'info');
        return;
    }

    if (!confirm(`Démarrer ${pendingItems.length} évaluation(s) ?`)) {
        return;
    }

    pendingItems.forEach(item => {
        const startBtn = item.querySelector('.start-evaluation');
        if (startBtn) {
            startBtn.click();
        }
    });

    showToast(`${pendingItems.length} évaluation(s) démarrée(s)`, 'success');
}

/**
 * Terminer toutes les évaluations en cours
 */
function completeAllInProgress() {
    const inProgressItems = document.querySelectorAll('.evaluation-item.in-progress');
    
    if (inProgressItems.length === 0) {
        showToast('Aucune évaluation en cours', 'info');
        return;
    }

    inProgressItems.forEach(item => {
        const completeBtn = item.querySelector('.complete-evaluation');
        if (completeBtn) {
            completeBtn.click();
        }
    });
}

/**
 * Exporter les évaluations
 */
function exportEvaluations() {
    // Récupérer les données d'évaluation
    const evaluations = [];
    document.querySelectorAll('.evaluation-item').forEach(item => {
        evaluations.push({
            candidate: item.querySelector('.candidate-name')?.textContent || 'Inconnu',
            status: item.querySelector('.evaluation-status')?.textContent || 'Inconnu',
            score: item.dataset.score || '0',
            submissionDate: item.dataset.submissionDate || new Date().toISOString()
        });
    });

    // Créer le contenu CSV
    const csvContent = [
        ['Candidat', 'Statut', 'Score', 'Date de soumission'],
        ...evaluations.map(e => [e.candidate, e.status, e.score, e.submissionDate])
    ].map(row => row.join(',')).join('\n');

    // Télécharger le fichier
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `evaluations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Export terminé', 'success');
}

/**
 * Afficher les statistiques
 */
function showStatistics() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    // Calculer les statistiques
    const total = document.querySelectorAll('.evaluation-item').length;
    const pending = document.querySelectorAll('.evaluation-item.pending').length;
    const inProgress = document.querySelectorAll('.evaluation-item.in-progress').length;
    const completed = document.querySelectorAll('.evaluation-item.completed').length;
    
    modal.innerHTML = `
        <div class="modal modal-lg">
            <div class="modal-header">
                <h3>Statistiques des évaluations</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${total}</div>
                        <div class="stat-label">Total</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${pending}</div>
                        <div class="stat-label">En attente</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${inProgress}</div>
                        <div class="stat-label">En cours</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${completed}</div>
                        <div class="stat-label">Terminées</div>
                    </div>
                </div>
                
                <div class="charts-container">
                    <canvas id="statsChart" width="400" height="200"></canvas>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary modal-close">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fermer la modale
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    
    // Initialiser le graphique
    setTimeout(() => {
        initStatsChart();
    }, 100);
}

/**
 * Initialiser le graphique de statistiques
 */
function initStatsChart() {
    const ctx = document.getElementById('statsChart');
    if (!ctx) return;
    
    const pending = document.querySelectorAll('.evaluation-item.pending').length;
    const inProgress = document.querySelectorAll('.evaluation-item.in-progress').length;
    const completed = document.querySelectorAll('.evaluation-item.completed').length;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['En attente', 'En cours', 'Terminées'],
            datasets: [{
                data: [pending, inProgress, completed],
                backgroundColor: [
                    '#f59e0b',
                    '#3b82f6',
                    '#10b981'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Ouvrir les paramètres
 */
function openSettings() {
    window.location.href = '/examiner/settings';
}

/**
 * Mises à jour en temps réel
 */
function initRealTimeUpdates() {
    // Simuler de nouvelles évaluations
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% de chance
            addNewEvaluation();
        }
    }, 60000); // Toutes les minutes

    // Mettre à jour les compteurs
    setInterval(updateCounters, 10000);
}

/**
 * Ajouter une nouvelle évaluation
 */
function addNewEvaluation() {
    const queue = document.querySelector('.evaluations-queue');
    if (!queue) return;

    const candidates = ['Dr. ADJOVI Jean', 'Dr. KOFFI Mensah', 'Dr. AMOUSSOU Kévin'];
    const departments = ['Génie Électrique', 'Informatique', 'Génie Mécanique'];
    const randomIndex = Math.floor(Math.random() * candidates.length);

    const newItem = document.createElement('div');
    newItem.className = 'evaluation-item pending';
    newItem.dataset.submissionDate = new Date().toISOString();
    newItem.dataset.score = (Math.random() * 40 + 60).toFixed(0);
    newItem.dataset.priority = 'normal';
    
    newItem.innerHTML = `
        <div class="evaluation-header">
            <div class="candidate-info">
                <div class="candidate-avatar">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div>
                    <h4 class="candidate-name">${candidates[randomIndex]}</h4>
                    <p class="candidate-department">${departments[randomIndex]}</p>
                </div>
            </div>
            <span class="evaluation-status status-normal">Normale</span>
        </div>
        <div class="evaluation-meta">
            <span><i class="far fa-clock"></i> À l'instant</span>
            <span><i class="fas fa-chart-line"></i> ${newItem.dataset.score}/100</span>
        </div>
        <div class="evaluation-actions">
            <button class="btn-start start-evaluation">
                <i class="fas fa-play"></i> Démarrer
            </button>
            <button class="btn-defer defer-evaluation">
                <i class="fas fa-clock"></i> Reporter
            </button>
        </div>
    `;

    // Ajouter en haut de la liste
    queue.insertBefore(newItem, queue.firstChild);
    
    // Ajouter les événements
    newItem.querySelector('.start-evaluation').addEventListener('click', function() {
        const item = this.closest('.evaluation-item');
        item.classList.remove('pending');
        item.classList.add('in-progress');
        this.style.display = 'none';
        const completeBtn = item.querySelector('.complete-evaluation');
        if (completeBtn) completeBtn.style.display = 'inline-flex';
    });

    newItem.querySelector('.defer-evaluation').addEventListener('click', function() {
        openDeferModal(newItem);
    });

    // Notification
    showToast(`Nouvelle évaluation: ${candidates[randomIndex]}`, 'info');
    
    // Animation d'entrée
    newItem.style.animation = 'slideIn 0.5s ease';
}

/**
 * Mettre à jour les compteurs
 */
function updateCounters() {
    const pendingCount = document.querySelectorAll('.evaluation-item.pending').length;
    const inProgressCount = document.querySelectorAll('.evaluation-item.in-progress').length;
    const completedCount = document.querySelectorAll('.evaluation-item.completed').length;

    // Mettre à jour les éléments d'interface
    document.querySelectorAll('.pending-count').forEach(el => {
        el.textContent = pendingCount;
    });
    
    document.querySelectorAll('.in-progress-count').forEach(el => {
        el.textContent = inProgressCount;
    });
    
    document.querySelectorAll('.completed-count').forEach(el => {
        el.textContent = completedCount;
    });
}

/**
 * Initialisation des filtres
 */
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    // Filtres par boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Mettre à jour l'état actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Appliquer le filtre
            applyFilter(filterValue);
        });
    });
    
    // Filtres par sélection
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterValue = this.value;
            applyFilter(filterValue);
        });
    });
}

/**
 * Appliquer un filtre
 */
function applyFilter(filterValue) {
    const items = document.querySelectorAll('.evaluation-item');
    
    items.forEach(item => {
        if (filterValue === 'all') {
            item.style.display = 'flex';
        } else if (filterValue === 'pending' && item.classList.contains('pending')) {
            item.style.display = 'flex';
        } else if (filterValue === 'in-progress' && item.classList.contains('in-progress')) {
            item.style.display = 'flex';
        } else if (filterValue === 'completed' && item.classList.contains('completed')) {
            item.style.display = 'flex';
        } else if (filterValue === 'urgent' && item.getAttribute('data-priority') === 'urgent') {
            item.style.display = 'flex';
        } else if (filterValue === 'high' && item.getAttribute('data-priority') === 'high') {
            item.style.display = 'flex';
        } else if (filterValue === 'normal' && item.getAttribute('data-priority') === 'normal') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Ouvrir le formulaire d'évaluation
 */
function openEvaluationForm(item, duration) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    const candidateName = item.querySelector('.candidate-name')?.textContent || 'Candidat';
    
    modal.innerHTML = `
        <div class="modal modal-lg">
            <div class="modal-header">
                <h3>Évaluation - ${candidateName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="evaluation-time">
                    <i class="fas fa-clock"></i>
                    <span>Temps passé: ${duration} minutes</span>
                </div>
                
                <form id="evaluationForm">
                    <div class="criteria-list">
                        <div class="criterion">
                            <label>Qualifications académiques</label>
                            <div class="rating">
                                <input type="radio" name="qualifications" value="5" id="q5">
                                <label for="q5">Excellent</label>
                                <input type="radio" name="qualifications" value="4" id="q4">
                                <label for="q4">Très bon</label>
                                <input type="radio" name="qualifications" value="3" id="q3">
                                <label for="q3">Bon</label>
                                <input type="radio" name="qualifications" value="2" id="q2">
                                <label for="q2">Moyen</label>
                                <input type="radio" name="qualifications" value="1" id="q1">
                                <label for="q1">Faible</label>
                            </div>
                        </div>
                        
                        <div class="criterion">
                            <label>Expérience professionnelle</label>
                            <div class="rating">
                                <input type="radio" name="experience" value="5" id="e5">
                                <label for="e5">Excellent</label>
                                <input type="radio" name="experience" value="4" id="e4">
                                <label for="e4">Très bon</label>
                                <input type="radio" name="experience" value="3" id="e3">
                                <label for="e3">Bon</label>
                                <input type="radio" name="experience" value="2" id="e2">
                                <label for="e2">Moyen</label>
                                <input type="radio" name="experience" value="1" id="e1">
                                <label for="e1">Faible</label>
                            </div>
                        </div>
                        
                        <div class="criterion">
                            <label>Publications et recherche</label>
                            <div class="rating">
                                <input type="radio" name="publications" value="5" id="p5">
                                <label for="p5">Excellent</label>
                                <input type="radio" name="publications" value="4" id="p4">
                                <label for="p4">Très bon</label>
                                <input type="radio" name="publications" value="3" id="p3">
                                <label for="p3">Bon</label>
                                <input type="radio" name="publications" value="2" id="p2">
                                <label for="p2">Moyen</label>
                                <input type="radio" name="publications" value="1" id="p1">
                                <label for="p1">Faible</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="comments">Commentaires</label>
                        <textarea id="comments" rows="4" placeholder="Notes supplémentaires..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Recommandation</label>
                        <div class="recommendation-buttons">
                            <button type="button" class="btn-recommend" data-recommendation="accept">
                                <i class="fas fa-check"></i> Accepter
                            </button>
                            <button type="button" class="btn-recommend" data-recommendation="review">
                                <i class="fas fa-redo"></i> Réviser
                            </button>
                            <button type="button" class="btn-recommend" data-recommendation="reject">
                                <i class="fas fa-times"></i> Rejeter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="submitEvaluation">Soumettre l'évaluation</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestion des recommandations
    modal.querySelectorAll('.btn-recommend').forEach(btn => {
        btn.addEventListener('click', function() {
            modal.querySelectorAll('.btn-recommend').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Soumission
    modal.querySelector('#submitEvaluation').addEventListener('click', function() {
        const selectedRecommendation = modal.querySelector('.btn-recommend.active');
        
        if (!selectedRecommendation) {
            alert('Veuillez sélectionner une recommandation');
            return;
        }
        
        // Simuler la soumission
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
        this.disabled = true;
        
        setTimeout(() => {
            // Mettre à jour l'élément original
            item.classList.remove('in-progress');
            item.classList.add('completed');
            
            const status = item.querySelector('.evaluation-status');
            if (status) {
                status.textContent = 'Terminée';
                status.className = 'evaluation-status status-completed';
            }
            
            // Fermer la modale
            modal.remove();
            
            showToast('Évaluation soumise avec succès', 'success');
        }, 1500);
    });
    
    // Fermeture
    modal.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
}

/**
 * Ouvrir la modale de report
 */
function openDeferModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Reporter l'évaluation</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="deferDate">Nouvelle date</label>
                    <input type="date" id="deferDate" value="${new Date(Date.now() + 86400000).toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label for="deferReason">Raison</label>
                    <select id="deferReason">
                        <option value="waiting">En attente d'informations</option>
                        <option value="busy">Charge de travail élevée</option>
                        <option value="other">Autre</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="deferNotes">Notes supplémentaires</label>
                    <textarea id="deferNotes" rows="3" placeholder="Notes optionnelles..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="confirmDefer">Confirmer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Confirmation
    modal.querySelector('#confirmDefer').addEventListener('click', function() {
        const deferDate = modal.querySelector('#deferDate').value;
        
        // Mettre à jour l'élément
        item.dataset.deferredTo = deferDate;
        item.classList.add('deferred');
        
        // Fermer la modale
        modal.remove();
        
        showToast('Évaluation reportée', 'info');
    });
    
    // Fermeture
    modal.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
}

// Initialisation complète
window.addEventListener('load', function() {
    // Mettre à jour les statistiques périodiquement
    setInterval(updateSidebarStats, 60000);
    
    // Animation CSS pour les nouvelles entrées
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
