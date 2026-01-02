/**
 * Layout Admin - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initAdminDashboard();
    initSystemMonitoring();
    initUserManagement();
    initOfferManagement();
    initReports();
    initBackupSystem();
    initAuditLogs();
});

/**
 * Initialisation du dashboard admin
 */
function initAdminDashboard() {
    // Mettre à jour les métriques en temps réel
    updateDashboardMetrics();
    
    // Initialiser les graphiques
    initDashboardCharts();
    
    // Activité récente
    initRecentActivity();
    
    // Système d'alertes
    initAlertSystem();
    
    // Mises à jour automatiques
    setInterval(updateDashboardMetrics, 30000);
    setInterval(checkSystemHealth, 60000);
}

/**
 * Mettre à jour les métriques du dashboard
 */
function updateDashboardMetrics() {
    const metrics = [
        { id: 'totalUsers', min: 1200, max: 1300 },
        { id: 'activeOffers', min: 20, max: 25 },
        { id: 'totalApplications', min: 350, max: 400 },
        { id: 'systemAlerts', min: 0, max: 10 }
    ];
    
    metrics.forEach(metric => {
        const element = document.getElementById(metric.id);
        if (!element) return;
        
        const currentValue = parseInt(element.textContent.replace(/,/g, '')) || metric.min;
        const fluctuation = Math.floor(Math.random() * 5) - 2; // -2 à +2
        const newValue = Math.max(metric.min, Math.min(metric.max, currentValue + fluctuation));
        
        if (newValue !== currentValue) {
            animateCounter(element, currentValue, newValue, 1000);
        }
    });
}

/**
 * Initialiser les graphiques du dashboard
 */
function initDashboardCharts() {
    // Graphique des utilisateurs par rôle
    initUsersByRoleChart();
    
    // Graphique des candidatures par département
    initApplicationsByDeptChart();
    
    // Graphique des performances du système
    initSystemPerformanceChart();
}

/**
 * Graphique des utilisateurs par rôle
 */
function initUsersByRoleChart() {
    const ctx = document.getElementById('usersByRoleChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Candidats', 'Examinateurs', 'Administrateurs', 'Super Admins'],
            datasets: [{
                data: [1050, 150, 30, 5],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Graphique des candidatures par département
 */
function initApplicationsByDeptChart() {
    const ctx = document.getElementById('applicationsByDeptChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Génie Élec.', 'Informatique', 'Génie Méca.', 'Génie Civil', 'Sciences'],
            datasets: [{
                label: 'Candidatures',
                data: [85, 72, 48, 35, 25],
                backgroundColor: '#0a3f8f',
                borderColor: '#0a3f8f',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nombre de candidatures'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Départements'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * Graphique des performances du système
 */
function initSystemPerformanceChart() {
    const ctx = document.getElementById('systemPerformanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'CPU',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Mémoire',
                    data: [28, 48, 40, 19, 86, 27],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Stockage',
                    data: [18, 28, 35, 40, 45, 48],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Utilisation (%)'
                    }
                }
            }
        }
    });
}

/**
 * Activité récente
 */
function initRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;

    // Charger plus d'activités
    const loadMoreBtn = document.getElementById('loadMoreActivity');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreActivities);
    }

    // Marquer comme lues
    document.querySelectorAll('.activity-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
                updateActivityBadge();
            }
        });
    });

    // Actualisation automatique
    setInterval(refreshActivity, 30000);
}

/**
 * Charger plus d'activités
 */
function loadMoreActivities() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;

    const loadMoreBtn = document.getElementById('loadMoreActivity');
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
        loadMoreBtn.disabled = true;
    }

    // Simulation de chargement
    setTimeout(() => {
        const newActivities = [
            {
                time: 'Il y a 5 minutes',
                type: 'user',
                action: 'connexion',
                user: 'Dr. KOFFI Mensah',
                details: 'Connexion depuis Paris, France'
            },
            {
                time: 'Il y a 10 minutes',
                type: 'system',
                action: 'backup',
                details: 'Sauvegarde automatique complétée'
            }
        ];

        newActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-icon">
                    <i class="fas fa-${activity.type === 'user' ? 'user' : 'server'}"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${activity.user || 'Système'}</strong> ${activity.details}</p>
                    <small>${activity.time}</small>
                </div>
            `;
            activityList.appendChild(item);
        });

        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = 'Charger plus';
            loadMoreBtn.disabled = false;
        }

        showToast('Activités mises à jour', 'info');
    }, 1000);
}

/**
 * Actualiser l'activité
 */
function refreshActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;

    const activities = [
        {
            time: 'À l\'instant',
            type: 'system',
            action: 'monitoring',
            details: 'Vérification du système effectuée'
        },
        {
            time: 'Il y a 1 minute',
            type: 'user',
            action: 'update',
            user: 'Administrateur',
            details: 'Mise à jour des paramètres système'
        }
    ];

    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item unread';
        item.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${activity.type === 'user' ? 'user' : 'server'}"></i>
            </div>
            <div class="activity-content">
                <p><strong>${activity.user || 'Système'}</strong> ${activity.details}</p>
                <small>${activity.time}</small>
            </div>
        `;
        activityList.insertBefore(item, activityList.firstChild);
    });

    // Limiter à 20 éléments
    const items = activityList.querySelectorAll('.activity-item');
    if (items.length > 20) {
        for (let i = 20; i < items.length; i++) {
            items[i].remove();
        }
    }

    updateActivityBadge();
}

/**
 * Mettre à jour le badge d'activité
 */
function updateActivityBadge() {
    const unreadCount = document.querySelectorAll('.activity-item.unread').length;
    const badge = document.querySelector('.activity-badge');
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

/**
 * Système d'alertes
 */
function initAlertSystem() {
    // Vérifier les alertes système
    checkSystemAlerts();
    
    // Configuration des alertes
    initAlertSettings();
    
    // Historique des alertes
    initAlertHistory();
}

/**
 * Vérifier les alertes système
 */
function checkSystemAlerts() {
    const alerts = [
        { type: 'warning', message: 'Stockage à 78%', action: 'storage' },
        { type: 'info', message: 'Mise à jour disponible', action: 'update' },
        { type: 'success', message: 'Sauvegarde réussie', action: 'backup' }
    ];

    const alertContainer = document.querySelector('.alerts-container');
    if (!alertContainer) return;

    // Ajouter les alertes
    alerts.forEach(alert => {
        if (!document.querySelector(`.alert[data-action="${alert.action}"]`)) {
            const alertElement = document.createElement('div');
            alertElement.className = `alert alert-${alert.type}`;
            alertElement.setAttribute('data-action', alert.action);
            alertElement.innerHTML = `
                <div class="alert-content">
                    <i class="fas fa-${getAlertIcon(alert.type)}"></i>
                    <span>${alert.message}</span>
                </div>
                <button class="alert-dismiss">&times;</button>
            `;
            
            alertContainer.appendChild(alertElement);
            
            // Fermer l'alerte
            alertElement.querySelector('.alert-dismiss').addEventListener('click', function() {
                alertElement.style.opacity = '0';
                setTimeout(() => alertElement.remove(), 300);
            });
            
            // Action sur clic
            alertElement.addEventListener('click', function() {
                handleAlertAction(alert.action);
            });
        }
    });
}

/**
 * Obtenir l'icône d'alerte
 */
function getAlertIcon(type) {
    switch(type) {
        case 'warning': return 'exclamation-triangle';
        case 'danger': return 'times-circle';
        case 'success': return 'check-circle';
        case 'info': return 'info-circle';
        default: return 'bell';
    }
}

/**
 * Gérer l'action d'alerte
 */
function handleAlertAction(action) {
    switch(action) {
        case 'storage':
            window.location.href = '/admin/storage';
            break;
        case 'update':
            checkForUpdates();
            break;
        case 'backup':
            showBackupStatus();
            break;
    }
}

/**
 * Vérifier les mises à jour
 */
function checkForUpdates() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Mises à jour du système</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="update-checking">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Vérification des mises à jour...</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Simulation de vérification
    setTimeout(() => {
        modal.querySelector('.update-checking').innerHTML = `
            <div class="update-available">
                <i class="fas fa-check-circle text-success"></i>
                <h4>Version 2.5.2 disponible</h4>
                <p>Améliorations de sécurité et corrections de bugs</p>
                <ul>
                    <li>Correction des failles XSS</li>
                    <li>Amélioration des performances</li>
                    <li>Nouvelles fonctionnalités de rapport</li>
                </ul>
                <button class="btn-primary" id="startUpdate">
                    <i class="fas fa-download"></i> Mettre à jour
                </button>
            </div>
        `;
        
        modal.querySelector('#startUpdate').addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mise à jour...';
            this.disabled = true;
            
            setTimeout(() => {
                modal.remove();
                showToast('Mise à jour installée avec succès', 'success');
            }, 3000);
        });
    }, 2000);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
}

/**
 * Configuration des alertes
 */
function initAlertSettings() {
    const alertSettings = document.querySelector('.alert-settings');
    if (!alertSettings) return;

    const checkboxes = alertSettings.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        // Restaurer les paramètres sauvegardés
        const settingName = checkbox.name;
        const savedValue = localStorage.getItem(`alert_${settingName}`);
        
        if (savedValue !== null) {
            checkbox.checked = savedValue === 'true';
        }
        
        // Sauvegarder les changements
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`alert_${this.name}`, this.checked);
            showToast('Paramètres d\'alerte mis à jour', 'success');
        });
    });
}

/**
 * Historique des alertes
 */
function initAlertHistory() {
    const historyTable = document.querySelector('.alert-history-table');
    if (!historyTable) return;

    // Charger l'historique
    loadAlertHistory();
    
    // Exporter l'historique
    const exportBtn = document.getElementById('exportAlertHistory');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportAlertHistory);
    }
    
    // Filtres
    const filterSelect = document.getElementById('alertHistoryFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', filterAlertHistory);
    }
}

/**
 * Charger l'historique des alertes
 */
function loadAlertHistory() {
    const history = [
        { date: '2024-12-15 10:30', type: 'warning', message: 'Stockage à 80%', resolved: true },
        { date: '2024-12-14 15:45', type: 'danger', message: 'Erreur de base de données', resolved: true },
        { date: '2024-12-13 09:20', type: 'info', message: 'Sauvegarde manuelle', resolved: true },
        { date: '2024-12-12 14:10', type: 'success', message: 'Mise à jour installée', resolved: true }
    ];

    const tbody = document.querySelector('.alert-history-table tbody');
    if (!tbody) return;

    history.forEach(alert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alert.date}</td>
            <td><span class="alert-badge alert-${alert.type}">${alert.type}</span></td>
            <td>${alert.message}</td>
            <td>${alert.resolved ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Exporter l'historique des alertes
 */
function exportAlertHistory() {
    const rows = document.querySelectorAll('.alert-history-table tbody tr');
    const csvData = [];
    
    // En-têtes
    csvData.push(['Date', 'Type', 'Message', 'Résolu']);
    
    // Données
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => {
            if (cell.querySelector('.alert-badge')) {
                return cell.querySelector('.alert-badge').textContent;
            } else if (cell.querySelector('i')) {
                return cell.querySelector('i').classList.contains('fa-check') ? 'Oui' : 'Non';
            }
            return cell.textContent;
        });
        csvData.push(rowData);
    });
    
    // Créer le fichier CSV
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `alert_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Historique exporté', 'success');
}

/**
 * Filtrer l'historique des alertes
 */
function filterAlertHistory() {
    const filter = document.getElementById('alertHistoryFilter').value;
    const rows = document.querySelectorAll('.alert-history-table tbody tr');
    
    rows.forEach(row => {
        const typeBadge = row.querySelector('.alert-badge');
        if (!typeBadge) return;
        
        const alertType = typeBadge.textContent.toLowerCase();
        
        if (filter === 'all' || alertType === filter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Surveillance du système
 */
function initSystemMonitoring() {
    // Mettre à jour les indicateurs
    updateSystemIndicators();
    
    // Surveillance en temps réel
    startRealTimeMonitoring();
    
    // Gestion des incidents
    initIncidentManagement();
}

/**
 * Mettre à jour les indicateurs système
 */
function updateSystemIndicators() {
    const indicators = document.querySelectorAll('.system-indicator');
    
    indicators.forEach(indicator => {
        const progress = indicator.querySelector('.indicator-progress');
        const value = indicator.querySelector('.indicator-value');
        
        if (!progress || !value) return;
        
        const currentValue = parseInt(value.textContent) || 0;
        const newValue = Math.min(100, Math.max(0, currentValue + (Math.random() * 10 - 5)));
        
        // Animation
        progress.style.width = `${newValue}%`;
        value.textContent = `${Math.round(newValue)}%`;
        
        // Couleur selon le niveau
        if (newValue > 90) {
            progress.style.backgroundColor = '#ef4444';
        } else if (newValue > 70) {
            progress.style.backgroundColor = '#f59e0b';
        } else {
            progress.style.backgroundColor = '#10b981';
        }
    });
}

/**
 * Surveillance en temps réel
 */
function startRealTimeMonitoring() {
    setInterval(updateSystemIndicators, 5000);
    
    // WebSocket pour les mises à jour en temps réel
    initSystemWebSocket();
}

/**
 * WebSocket pour la surveillance système
 */
function initSystemWebSocket() {
    // Simulation de WebSocket
    setInterval(() => {
        if (Math.random() > 0.8) {
            const events = [
                { type: 'login', user: 'Utilisateur anonyme', ip: '192.168.1.100' },
                { type: 'error', component: 'Database', message: 'Connection timeout' },
                { type: 'warning', component: 'Storage', message: 'Disk usage high' }
            ];
            
            const event = events[Math.floor(Math.random() * events.length)];
            addSystemEvent(event);
        }
    }, 10000);
}

/**
 * Ajouter un événement système
 */
function addSystemEvent(event) {
    const eventsList = document.querySelector('.system-events');
    if (!eventsList) return;
    
    const eventElement = document.createElement('div');
    eventElement.className = 'system-event';
    eventElement.innerHTML = `
        <div class="event-icon">
            <i class="fas fa-${getEventIcon(event.type)}"></i>
        </div>
        <div class="event-content">
            <p><strong>${event.component || 'Système'}</strong> ${event.message || `${event.type} de ${event.user}`}</p>
            <small>${new Date().toLocaleTimeString()}</small>
        </div>
    `;
    
    eventsList.insertBefore(eventElement, eventsList.firstChild);
    
    // Limiter à 50 événements
    const events = eventsList.querySelectorAll('.system-event');
    if (events.length > 50) {
        events[50].remove();
    }
    
    // Notification
    if (event.type === 'error' || event.type === 'warning') {
        showToast(`Événement système: ${event.message || event.type}`, 'warning');
    }
}

/**
 * Obtenir l'icône d'événement
 */
function getEventIcon(type) {
    switch(type) {
        case 'login': return 'sign-in-alt';
        case 'error': return 'times-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': return 'info-circle';
        default: return 'bell';
    }
}

/**
 * Gestion des incidents
 */
function initIncidentManagement() {
    const incidentTable = document.querySelector('.incidents-table');
    if (!incidentTable) return;

    // Charger les incidents
    loadIncidents();
    
    // Gestion des nouveaux incidents
    const reportBtn = document.getElementById('reportIncident');
    if (reportBtn) {
        reportBtn.addEventListener('click', reportIncident);
    }
}

/**
 * Charger les incidents
 */
function loadIncidents() {
    const incidents = [
        { id: 1, title: 'Base de données lente', status: 'resolved', priority: 'high', reported: '2024-12-15', resolved: '2024-12-15' },
        { id: 2, title: 'Erreur de connexion', status: 'investigating', priority: 'medium', reported: '2024-12-14', resolved: null },
        { id: 3, title: 'Performance API', status: 'open', priority: 'low', reported: '2024-12-13', resolved: null }
    ];

    const tbody = document.querySelector('.incidents-table tbody');
    if (!tbody) return;

    incidents.forEach(incident => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${incident.id}</td>
            <td>${incident.title}</td>
            <td><span class="status-badge status-${incident.status}">${incident.status}</span></td>
            <td><span class="priority-badge priority-${incident.priority}">${incident.priority}</span></td>
            <td>${incident.reported}</td>
            <td>${incident.resolved || '-'}</td>
            <td>
                <button class="btn-action view-incident" data-id="${incident.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Événements de visualisation
    document.querySelectorAll('.view-incident').forEach(btn => {
        btn.addEventListener('click', function() {
            const incidentId = this.getAttribute('data-id');
            viewIncident(incidentId);
        });
    });
}

/**
 * Visualiser un incident
 */
function viewIncident(id) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal modal-lg">
            <div class="modal-header">
                <h3>Incident #${id}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="incident-details">
                    <p>Détails de l'incident en cours de chargement...</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Simulation de chargement
    setTimeout(() => {
        modal.querySelector('.incident-details').innerHTML = `
            <div class="detail-section">
                <h4>Description</h4>
                <p>Problème de performance de la base de données survenu le 15 décembre 2024.</p>
            </div>
            <div class="detail-section">
                <h4>Impact</h4>
                <p>Ralentissement des requêtes, temps de réponse augmenté de 200%.</p>
            </div>
            <div class="detail-section">
                <h4>Solution</h4>
                <p>Optimisation des index de la base de données et augmentation des ressources.</p>
            </div>
            <div class="detail-section">
                <h4>Statut</h4>
                <p><span class="status-badge status-resolved">Résolu</span></p>
            </div>
        `;
    }, 500);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
}

/**
 * Signaler un incident
 */
function reportIncident() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Signaler un incident</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="incidentForm">
                    <div class="form-group">
                        <label for="incidentTitle">Titre</label>
                        <input type="text" id="incidentTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="incidentDescription">Description</label>
                        <textarea id="incidentDescription" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="incidentPriority">Priorité</label>
                        <select id="incidentPriority" required>
                            <option value="low">Basse</option>
                            <option value="medium" selected>Moyenne</option>
                            <option value="high">Haute</option>
                            <option value="critical">Critique</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="incidentComponent">Composant concerné</label>
                        <select id="incidentComponent" required>
                            <option value="database">Base de données</option>
                            <option value="server">Serveur</option>
                            <option value="application">Application</option>
                            <option value="network">Réseau</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="submitIncident">Signaler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Soumission
    modal.querySelector('#submitIncident').addEventListener('click', function() {
        const form = modal.querySelector('#incidentForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        this.disabled = true;
        
        setTimeout(() => {
            modal.remove();
            showToast('Incident signalé avec succès', 'success');
            
            // Ajouter à la table
            addNewIncidentToTable({
                title: modal.querySelector('#incidentTitle').value,
                priority: modal.querySelector('#incidentPriority').value
            });
        }, 1500);
    });
    
    // Fermeture
    modal.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
}

/**
 * Ajouter un nouvel incident à la table
 */
function addNewIncidentToTable(incident) {
    const tbody = document.querySelector('.incidents-table tbody');
    if (!tbody) return;

    const newId = tbody.querySelectorAll('tr').length + 1;
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>#${newId}</td>
        <td>${incident.title}</td>
        <td><span class="status-badge status-open">open</span></td>
        <td><span class="priority-badge priority-${incident.priority}">${incident.priority}</span></td>
        <td>${new Date().toISOString().split('T')[0]}</td>
        <td>-</td>
        <td>
            <button class="btn-action view-incident" data-id="${newId}">
                <i class="fas fa-eye"></i>
            </button>
        </td>
    `;
    
    tbody.insertBefore(row, tbody.firstChild);
    
    // Ajouter l'événement de visualisation
    row.querySelector('.view-incident').addEventListener('click', function() {
        viewIncident(newId);
    });
}

/**
 * Gestion des utilisateurs
 */
function initUserManagement() {
    // Table des utilisateurs
    initUsersTable();
    
    // Recherche d'utilisateurs
    initUserSearch();
    
    // Actions groupées
    initBulkUserActions();
    
    // Import/Export
    initUserImportExport();
}

/**
 * Table des utilisateurs
 */
function initUsersTable() {
    const usersTable = document.querySelector('.users-table');
    if (!usersTable) return;

    // Tri des colonnes
    initTableSorting(usersTable);
    
    // Filtres
    initUserFilters();
    
    // Édition inline
    initInlineEditing();
    
    // Pagination
    initTablePagination(usersTable);
}

/**
 * Tri des tables
 */
function initTableSorting(table) {
    const headers = table.querySelectorAll('th[data-sort]');
    
    headers.forEach(header => {
        header.style.cursor = 'pointer';
        
        header.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            const sortOrder = this.getAttribute('data-order') === 'asc' ? 'desc' : 'asc';
            
            // Mettre à jour l'ordre
            this.setAttribute('data-order', sortOrder);
            
            // Mettre à jour les icônes
            headers.forEach(h => {
                h.querySelector('.sort-icon')?.remove();
            });
            
            const icon = document.createElement('i');
            icon.className = `fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'} sort-icon`;
            this.appendChild(icon);
            
            // Trier les données
            sortTable(table, sortBy, sortOrder);
        });
    });
}

/**
 * Trier une table
 */
function sortTable(table, sortBy, order) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.querySelector(`td[data-${sortBy}]`)?.getAttribute(`data-${sortBy}`) || 
                      a.querySelector(`td:nth-child(${getColumnIndex(table, sortBy)})`)?.textContent || '';
        const bValue = b.querySelector(`td[data-${sortBy}]`)?.getAttribute(`data-${sortBy}`) || 
                      b.querySelector(`td:nth-child(${getColumnIndex(table, sortBy)})`)?.textContent || '';
        
        // Conversion pour les nombres
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return order === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // Tri alphabétique
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    
    // Réorganiser les lignes
    rows.forEach(row => tbody.appendChild(row));
}

/**
 * Obtenir l'index de colonne
 */
function getColumnIndex(table, columnName) {
    const headers = table.querySelectorAll('th');
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].getAttribute('data-sort') === columnName) {
            return i + 1;
        }
    }
    return 1;
}

/**
 * Filtres utilisateurs
 */
function initUserFilters() {
    const filterSelects = document.querySelectorAll('.user-filter');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyUserFilters();
        });
    });
}

/**
 * Appliquer les filtres utilisateurs
 */
function applyUserFilters() {
    const roleFilter = document.querySelector('.user-filter[data-filter="role"]')?.value;
    const statusFilter = document.querySelector('.user-filter[data-filter="status"]')?.value;
    const dateFilter = document.querySelector('.user-filter[data-filter="date"]')?.value;
    
    const rows = document.querySelectorAll('.users-table tbody tr');
    
    rows.forEach(row => {
        const role = row.getAttribute('data-role');
        const status = row.getAttribute('data-status');
        const date = new Date(row.getAttribute('data-date') || 0);
        const now = new Date();
        
        let show = true;
        
        // Filtre par rôle
        if (roleFilter && roleFilter !== 'all' && role !== roleFilter) {
            show = false;
        }
        
        // Filtre par statut
        if (statusFilter && statusFilter !== 'all' && status !== statusFilter) {
            show = false;
        }
        
        // Filtre par date
        if (dateFilter && dateFilter !== 'all') {
            const diffDays = (now - date) / (1000 * 60 * 60 * 24);
            
            switch(dateFilter) {
                case 'today':
                    if (diffDays > 1) show = false;
                    break;
                case 'week':
                    if (diffDays > 7) show = false;
                    break;
                case 'month':
                    if (diffDays > 30) show = false;
                    break;
            }
        }
        
        row.style.display = show ? '' : 'none';
    });
}

/**
 * Édition inline
 */
function initInlineEditing() {
    const editableCells = document.querySelectorAll('.editable');
    
    editableCells.forEach(cell => {
        cell.addEventListener('dblclick', function() {
            const originalValue = this.textContent;
            const field = this.getAttribute('data-field');
            
            // Créer l'input d'édition
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalValue;
            input.className = 'inline-edit';
            
            this.innerHTML = '';
            this.appendChild(input);
            input.focus();
            
            // Sauvegarder au blur
            input.addEventListener('blur', function() {
                const newValue = this.value.trim();
                const cell = this.closest('.editable');
                
                if (newValue && newValue !== originalValue) {
                    // Envoyer la mise à jour
                    updateUserField(cell.closest('tr').getAttribute('data-user-id'), field, newValue)
                        .then(() => {
                            cell.textContent = newValue;
                            showToast('Champ mis à jour', 'success');
                        })
                        .catch(() => {
                            cell.textContent = originalValue;
                            showToast('Erreur de mise à jour', 'error');
                        });
                } else {
                    cell.textContent = originalValue;
                }
            });
            
            // Sauvegarder avec Enter
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    this.blur();
                }
            });
        });
    });
}

/**
 * Mettre à jour un champ utilisateur
 */
function updateUserField(userId, field, value) {
    return new Promise((resolve, reject) => {
        // Simulation d'API
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% de succès
                resolve();
            } else {
                reject();
            }
        }, 500);
    });
}

/**
 * Pagination des tables
 */
function initTablePagination(table) {
    const pagination = table.closest('.table-container')?.querySelector('.table-pagination');
    if (!pagination) return;

    const pageSize = 10;
    let currentPage = 1;
    
    // Initialiser la pagination
    updatePagination();
    
    // Boutons de pagination
    pagination.querySelector('.prev-page')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    
    pagination.querySelector('.next-page')?.addEventListener('click', () => {
        const totalRows = table.querySelectorAll('tbody tr').length;
        const totalPages = Math.ceil(totalRows / pageSize);
        
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
    
    // Sélecteur de page
    const pageSelect = pagination.querySelector('.page-select');
    if (pageSelect) {
        pageSelect.addEventListener('change', function() {
            currentPage = parseInt(this.value);
            updatePagination();
        });
    }
    
    function updatePagination() {
        const rows = table.querySelectorAll('tbody tr');
        const totalRows = rows.length;
        const totalPages = Math.ceil(totalRows / pageSize);
        
        // Masquer toutes les lignes
        rows.forEach(row => row.style.display = 'none');
        
        // Afficher les lignes de la page courante
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        
        for (let i = start; i < end && i < totalRows; i++) {
            rows[i].style.display = '';
        }
        
        // Mettre à jour les informations
        const info = pagination.querySelector('.pagination-info');
        if (info) {
            info.textContent = `Affichage ${start + 1}-${Math.min(end, totalRows)} sur ${totalRows}`;
        }
        
        // Mettre à jour les boutons
        const prevBtn = pagination.querySelector('.prev-page');
        const nextBtn = pagination.querySelector('.next-page');
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
        
        // Mettre à jour le sélecteur de page
        if (pageSelect) {
            pageSelect.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                if (i === currentPage) option.selected = true;
                pageSelect.appendChild(option);
            }
        }
    }
}

/**
 * Recherche d'utilisateurs
 */
function initUserSearch() {
    const searchInput = document.querySelector('.user-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.users-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
        
        // Réinitialiser la pagination
        const table = document.querySelector('.users-table');
        if (table) {
            initTablePagination(table);
        }
    });
}

/**
 * Actions groupées sur les utilisateurs
 */
function initBulkUserActions() {
    const selectAll = document.querySelector('.select-all-users');
    const userCheckboxes = document.querySelectorAll('.user-checkbox');
    const bulkActions = document.querySelector('.bulk-actions');
    
    if (!selectAll || !bulkActions) return;

    // Sélectionner/désélectionner tous
    selectAll.addEventListener('change', function() {
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateBulkActions();
    });

    // Mettre à jour les actions groupées
    userCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBulkActions);
    });

    // Actions groupées
    bulkActions.querySelectorAll('.bulk-action').forEach(action => {
        action.addEventListener('click', function() {
            const selectedUsers = Array.from(userCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.closest('tr').getAttribute('data-user-id'));
            
            if (selectedUsers.length === 0) {
                showToast('Veuillez sélectionner au moins un utilisateur', 'warning');
                return;
            }
            
            const actionType = this.getAttribute('data-action');
            performBulkAction(actionType, selectedUsers);
        });
    });
}

/**
 * Mettre à jour les actions groupées
 */
function updateBulkActions() {
    const selectedCount = document.querySelectorAll('.user-checkbox:checked').length;
    const bulkActions = document.querySelector('.bulk-actions');
    
    if (!bulkActions) return;
    
    if (selectedCount > 0) {
        bulkActions.classList.add('active');
        bulkActions.querySelector('.selected-count').textContent = selectedCount;
    } else {
        bulkActions.classList.remove('active');
    }
}

/**
 * Effectuer une action groupée
 */
function performBulkAction(action, userIds) {
    switch(action) {
        case 'activate':
            if (confirm(`Activer ${userIds.length} utilisateur(s) ?`)) {
                userIds.forEach(id => activateUser(id));
            }
            break;
        case 'deactivate':
            if (confirm(`Désactiver ${userIds.length} utilisateur(s) ?`)) {
                userIds.forEach(id => deactivateUser(id));
            }
            break;
        case 'delete':
            if (confirm(`Supprimer ${userIds.length} utilisateur(s) ? Cette action est irréversible.`)) {
                userIds.forEach(id => deleteUser(id));
            }
            break;
        case 'export':
            exportSelectedUsers(userIds);
            break;
    }
}

/**
 * Activer un utilisateur
 */
function activateUser(userId) {
    const row = document.querySelector(`tr[data-user-id="${userId}"]`);
    if (!row) return;
    
    const statusBadge = row.querySelector('.user-status');
    if (statusBadge) {
        statusBadge.textContent = 'Actif';
        statusBadge.className = 'user-status status-active';
    }
    
    showToast('Utilisateur activé', 'success');
}

/**
 * Désactiver un utilisateur
 */
function deactivateUser(userId) {
    const row = document.querySelector(`tr[data-user-id="${userId}"]`);
    if (!row) return;
    
    const statusBadge = row.querySelector('.user-status');
    if (statusBadge) {
        statusBadge.textContent = 'Inactif';
        statusBadge.className = 'user-status status-inactive';
    }
    
    showToast('Utilisateur désactivé', 'success');
}

/**
 * Supprimer un utilisateur
 */
function deleteUser(userId) {
    const row = document.querySelector(`tr[data-user-id="${userId}"]`);
    if (!row) return;
    
    row.style.opacity = '0.5';
    setTimeout(() => {
        row.remove();
        showToast('Utilisateur supprimé', 'success');
        updateBulkActions();
    }, 500);
}

/**
 * Exporter les utilisateurs sélectionnés
 */
function exportSelectedUsers(userIds) {
    const rows = userIds.map(id => document.querySelector(`tr[data-user-id="${id}"]`));
    const csvData = [];
    
    // En-têtes
    const headers = Array.from(document.querySelectorAll('.users-table th')).map(th => th.textContent);
    csvData.push(headers);
    
    // Données
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
        csvData.push(cells);
    });
    
    // Créer le fichier
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Utilisateurs exportés', 'success');
}

/**
 * Import/Export d'utilisateurs
 */
function initUserImportExport() {
    const importBtn = document.getElementById('importUsers');
    const exportBtn = document.getElementById('exportAllUsers');
    
    if (importBtn) {
        importBtn.addEventListener('click', importUsers);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportAllUsers);
    }
}

/**
 * Importer des utilisateurs
 */
function importUsers() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Import d'utilisateurs</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="import-preview">
                        <p>Fichier: ${file.name}</p>
                        <p>Taille: ${(file.size / 1024).toFixed(2)} KB</p>
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                        <p class="progress-text">0%</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Simulation d'import
        const progress = modal.querySelector('.progress');
        const progressText = modal.querySelector('.progress-text');
        let percent = 0;
        
        const interval = setInterval(() => {
            percent += 10;
            progress.style.width = `${percent}%`;
            progressText.textContent = `${percent}%`;
            
            if (percent >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    modal.remove();
                    showToast('Import terminé avec succès', 'success');
                }, 500);
            }
        }, 200);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            clearInterval(interval);
            modal.remove();
        });
    });
    
    input.click();
}

/**
 * Exporter tous les utilisateurs
 */
function exportAllUsers() {
    const rows = document.querySelectorAll('.users-table tbody tr');
    const csvData = [];
    
    // En-têtes
    const headers = Array.from(document.querySelectorAll('.users-table th')).map(th => th.textContent);
    csvData.push(headers);
    
    // Données
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
        csvData.push(cells);
    });
    
    // Créer le fichier
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `all_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Tous les utilisateurs ont été exportés', 'success');
}

/**
 * Gestion des offres
 */
function initOfferManagement() {
    // Table des offres
    initOffersTable();
    
    // Création d'offres
    initOfferCreation();
    
    // Statistiques des offres
    initOfferStatistics();
}

/**
 * Table des offres
 */
function initOffersTable() {
    const offersTable = document.querySelector('.offers-table');
    if (!offersTable) return;

    // Actions rapides
    initOfferQuickActions();
    
    // Filtres
    initOfferFilters();
    
    // Édition
    initOfferEditing();
}

/**
 * Actions rapides sur les offres
 */
function initOfferQuickActions() {
    const actionButtons = document.querySelectorAll('.offer-action');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const offerId = this.closest('tr').getAttribute('data-offer-id');
            
            switch(action) {
                case 'edit':
                    editOffer(offerId);
                    break;
                case 'duplicate':
                    duplicateOffer(offerId);
                    break;
                case 'close':
                    closeOffer(offerId);
                    break;
                case 'delete':
                    deleteOffer(offerId);
                    break;
                case 'stats':
                    showOfferStats(offerId);
                    break;
            }
        });
    });
}

/**
 * Éditer une offre
 */
function editOffer(offerId) {
    window.location.href = `/admin/offers/${offerId}/edit`;
}

/**
 * Dupliquer une offre
 */
function duplicateOffer(offerId) {
    if (!confirm('Dupliquer cette offre ?')) return;
    
    // Simulation
    showToast('Offre dupliquée avec succès', 'success');
}

/**
 * Fermer une offre
 */
function closeOffer(offerId) {
    if (!confirm('Fermer cette offre ? Les nouvelles candidatures ne seront plus acceptées.')) return;
    
    const row = document.querySelector(`tr[data-offer-id="${offerId}"]`);
    if (!row) return;
    
    const statusCell = row.querySelector('.offer-status');
    if (statusCell) {
        statusCell.textContent = 'Fermée';
        statusCell.className = 'offer-status status-closed';
    }
    
    showToast('Offre fermée', 'success');
}

/**
 * Supprimer une offre
 */
function deleteOffer(offerId) {
    if (!confirm('Supprimer définitivement cette offre ?')) return;
    
    const row = document.querySelector(`tr[data-offer-id="${offerId}"]`);
    if (!row) return;
    
    row.style.opacity = '0.5';
    setTimeout(() => {
        row.remove();
        showToast('Offre supprimée', 'success');
    }, 500);
}

/**
 * Afficher les statistiques d'une offre
 */
function showOfferStats(offerId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal modal-lg">
            <div class="modal-header">
                <h3>Statistiques de l'offre #${offerId}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">85</div>
                        <div class="stat-label">Candidatures</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">1,245</div>
                        <div class="stat-label">Vues</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">6.8%</div>
                        <div class="stat-label">Taux de conversion</div>
                    </div>
                </div>
                <canvas id="offerStatsChart" width="400" height="200"></canvas>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Graphique
    setTimeout(() => {
        const ctx = document.getElementById('offerStatsChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                    datasets: [{
                        label: 'Candidatures',
                        data: [12, 15, 8, 20, 14, 10, 6],
                        borderColor: '#0a3f8f',
                        backgroundColor: 'rgba(10, 63, 143, 0.1)',
                        fill: true
                    }]
                }
            });
        }
    }, 100);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
}

/**
 * Filtres d'offres
 */
function initOfferFilters() {
    const filterButtons = document.querySelectorAll('.offer-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mettre à jour l'état actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Appliquer le filtre
            const rows = document.querySelectorAll('.offers-table tbody tr');
            
            rows.forEach(row => {
                const status = row.querySelector('.offer-status')?.textContent.toLowerCase();
                
                if (filter === 'all') {
                    row.style.display = '';
                } else if (filter === 'active' && status === 'active') {
                    row.style.display = '';
                } else if (filter === 'closed' && status === 'closed') {
                    row.style.display = '';
                } else if (filter === 'draft' && status === 'draft') {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Édition d'offres
 */
function initOfferEditing() {
    // À implémenter selon les besoins spécifiques
}

/**
 * Création d'offres
 */
function initOfferCreation() {
    const createBtn = document.getElementById('createOffer');
    if (!createBtn) return;

    createBtn.addEventListener('click', function() {
        window.location.href = '/admin/offers/create';
    });
}

/**
 * Statistiques des offres
 */
function initOfferStatistics() {
    // Mettre à jour périodiquement
    setInterval(updateOfferStats, 60000);
}

/**
 * Mettre à jour les statistiques des offres
 */
function updateOfferStats() {
    const statsElements = document.querySelectorAll('.offer-stat');
    
    statsElements.forEach(element => {
        const current = parseInt(element.textContent) || 0;
        const change = Math.floor(Math.random() * 5) - 2;
        const newValue = Math.max(0, current + change);
        
        if (newValue !== current) {
            animateCounter(element, current, newValue, 500);
        }
    });
}

/**
 * Rapports
 */
function initReports() {
    // Génération de rapports
    initReportGeneration();
    
    // Historique des rapports
    initReportHistory();
    
    // Planification
    initReportScheduling();
}

/**
 * Génération de rapports
 */
function initReportGeneration() {
    const generateBtn = document.getElementById('generateReport');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', function() {
        const reportType = document.getElementById('reportType').value;
        const dateRange = document.getElementById('reportDateRange').value;
        
        generateReport(reportType, dateRange);
    });
}

/**
 * Générer un rapport
 */
function generateReport(type, dateRange) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Génération de rapport</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="report-generation">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Génération du rapport ${type}...</p>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Simulation
    const progress = modal.querySelector('.progress');
    let percent = 0;
    
    const interval = setInterval(() => {
        percent += 20;
        progress.style.width = `${percent}%`;
        
        if (percent >= 100) {
            clearInterval(interval);
            
            modal.querySelector('.report-generation').innerHTML = `
                <i class="fas fa-check-circle text-success"></i>
                <h4>Rapport généré avec succès</h4>
                <p>Rapport ${type} pour ${dateRange}</p>
                <div class="report-actions">
                    <button class="btn-primary" id="downloadReport">
                        <i class="fas fa-download"></i> Télécharger
                    </button>
                    <button class="btn-secondary" id="viewReport">
                        <i class="fas fa-eye"></i> Visualiser
                    </button>
                </div>
            `;
            
            modal.querySelector('#downloadReport').addEventListener('click', () => {
                downloadReport(type, dateRange);
                modal.remove();
            });
            
            modal.querySelector('#viewReport').addEventListener('click', () => {
                viewReport(type, dateRange);
                modal.remove();
            });
        }
    }, 300);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        clearInterval(interval);
        modal.remove();
    });
}

/**
 * Télécharger un rapport
 */
function downloadReport(type, dateRange) {
    const content = `Rapport ${type} - ${dateRange}\n\nDonnées simulées...`;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `rapport_${type}_${dateRange}.txt`);
    link.click();
    
    showToast('Rapport téléchargé', 'success');
}

/**
 * Visualiser un rapport
 */
function viewReport(type, dateRange) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal modal-xl">
            <div class="modal-header">
                <h3>Rapport ${type} - ${dateRange}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="report-content">
                    <h4>Résumé exécutif</h4>
                    <p>Ce rapport présente les statistiques pour la période ${dateRange}.</p>
                    
                    <h4>Données statistiques</h4>
                    <table class="report-table">
                        <tr>
                            <th>Métrique</th>
                            <th>Valeur</th>
                        </tr>
                        <tr>
                            <td>Utilisateurs actifs</td>
                            <td>1,042</td>
                        </tr>
                        <tr>
                            <td>Nouvelles candidatures</td>
                            <td>356</td>
                        </tr>
                        <tr>
                            <td>Offres actives</td>
                            <td>24</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-close">Fermer</button>
                <button class="btn-primary" onclick="downloadReport('${type}', '${dateRange}')">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
}

/**
 * Historique des rapports
 */
function initReportHistory() {
    const historyTable = document.querySelector('.report-history-table');
    if (!historyTable) return;

    // Charger l'historique
    loadReportHistory();
}

/**
 * Charger l'historique des rapports
 */
function loadReportHistory() {
    const history = [
        { id: 1, type: 'Utilisateurs', date: '2024-12-15', generatedBy: 'Admin', size: '2.4MB' },
        { id: 2, type: 'Candidatures', date: '2024-12-14', generatedBy: 'System', size: '1.8MB' },
        { id: 3, type: 'Système', date: '2024-12-13', generatedBy: 'Admin', size: '3.2MB' }
    ];

    const tbody = document.querySelector('.report-history-table tbody');
    if (!tbody) return;

    history.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${report.id}</td>
            <td>${report.type}</td>
            <td>${report.date}</td>
            <td>${report.generatedBy}</td>
            <td>${report.size}</td>
            <td>
                <button class="btn-action download-report" data-id="${report.id}">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn-action delete-report" data-id="${report.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Événements
    document.querySelectorAll('.download-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id');
            downloadHistoricalReport(reportId);
        });
    });

    document.querySelectorAll('.delete-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id');
            deleteHistoricalReport(reportId);
        });
    });
}

/**
 * Télécharger un rapport historique
 */
function downloadHistoricalReport(id) {
    showToast(`Téléchargement du rapport #${id}`, 'info');
}

/**
 * Supprimer un rapport historique
 */
function deleteHistoricalReport(id) {
    if (confirm('Supprimer ce rapport ?')) {
        const row = document.querySelector(`.download-report[data-id="${id}"]`)?.closest('tr');
        if (row) {
            row.remove();
            showToast('Rapport supprimé', 'success');
        }
    }
}

/**
 * Planification des rapports
 */
function initReportScheduling() {
    const scheduleBtn = document.getElementById('scheduleReport');
    if (!scheduleBtn) return;

    scheduleBtn.addEventListener('click', scheduleReport);
}

/**
 * Planifier un rapport
 */
function scheduleReport() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Planifier un rapport</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="scheduleForm">
                    <div class="form-group">
                        <label for="scheduleType">Type de rapport</label>
                        <select id="scheduleType" required>
                            <option value="daily">Quotidien</option>
                            <option value="weekly">Hebdomadaire</option>
                            <option value="monthly">Mensuel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="scheduleTime">Heure d'envoi</label>
                        <input type="time" id="scheduleTime" value="08:00" required>
                    </div>
                    <div class="form-group">
                        <label for="scheduleRecipients">Destinataires</label>
                        <input type="text" id="scheduleRecipients" placeholder="emails séparés par des virgules" required>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="scheduleActive" checked>
                            Activer la planification
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="saveSchedule">Enregistrer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Sauvegarde
    modal.querySelector('#saveSchedule').addEventListener('click', function() {
        const form = modal.querySelector('#scheduleForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
        this.disabled = true;
        
        setTimeout(() => {
            modal.remove();
            showToast('Planification enregistrée', 'success');
        }, 1000);
    });
    
    // Fermeture
    modal.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
}

/**
 * Système de sauvegarde
 */
function initBackupSystem() {
    // Vérifier l'état des sauvegardes
    checkBackupStatus();
    
    // Planification des sauvegardes
    initBackupScheduling();
    
    // Restauration
    initBackupRestoration();
}

/**
 * Vérifier l'état des sauvegardes
 */
function checkBackupStatus() {
    const statusElement = document.querySelector('.backup-status');
    if (!statusElement) return;

    // Simulation
    const status = Math.random() > 0.5 ? 'healthy' : 'warning';
    const lastBackup = new Date(Date.now() - Math.random() * 86400000).toLocaleString();
    
    statusElement.innerHTML = `
        <div class="status-indicator status-${status}"></div>
        <span>Dernière sauvegarde: ${lastBackup}</span>
    `;
    
    // Mettre à jour périodiquement
    setInterval(() => {
        checkBackupStatus();
    }, 30000);
}

/**
 * Planification des sauvegardes
 */
function initBackupScheduling() {
    const scheduleBtn = document.getElementById('scheduleBackup');
    if (!scheduleBtn) return;

    scheduleBtn.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Planifier une sauvegarde</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="backup-options">
                        <div class="option">
                            <input type="radio" name="backupType" id="fullBackup" checked>
                            <label for="fullBackup">
                                <i class="fas fa-database"></i>
                                <span>Sauvegarde complète</span>
                                <small>Toutes les données</small>
                            </label>
                        </div>
                        <div class="option">
                            <input type="radio" name="backupType" id="incrementalBackup">
                            <label for="incrementalBackup">
                                <i class="fas fa-history"></i>
                                <span>Sauvegarde incrémentielle</span>
                                <small>Données modifiées seulement</small>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="backupFrequency">Fréquence</label>
                        <select id="backupFrequency">
                            <option value="daily">Quotidienne</option>
                            <option value="weekly">Hebdomadaire</option>
                            <option value="monthly">Mensuelle</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="backupRetention">Rétention (jours)</label>
                        <input type="number" id="backupRetention" value="30" min="1" max="365">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-cancel">Annuler</button>
                    <button class="btn-primary" id="saveBackupSchedule">Enregistrer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Sauvegarde
        modal.querySelector('#saveBackupSchedule').addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
            this.disabled = true;
            
            setTimeout(() => {
                modal.remove();
                showToast('Planification enregistrée', 'success');
            }, 1000);
        });
        
        // Fermeture
        modal.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });
    });
}

/**
 * Restauration de sauvegarde
 */
function initBackupRestoration() {
    const restoreBtn = document.getElementById('restoreBackup');
    if (!restoreBtn) return;

    restoreBtn.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        
        modal.innerHTML = `
            <div class="modal modal-lg">
                <div class="modal-header">
                    <h3>Restaurer une sauvegarde</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="backup-list">
                        <div class="backup-item">
                            <input type="radio" name="backupSelect" id="backup1">
                            <label for="backup1">
                                <div class="backup-info">
                                    <strong>Sauvegarde complète</strong>
                                    <small>15 Décembre 2024 - 08:00</small>
                                    <span class="backup-size">2.4 GB</span>
                                </div>
                            </label>
                        </div>
                        <div class="backup-item">
                            <input type="radio" name="backupSelect" id="backup2">
                            <label for="backup2">
                                <div class="backup-info">
                                    <strong>Sauvegarde incrémentielle</strong>
                                    <small>14 Décembre 2024 - 08:00</small>
                                    <span class="backup-size">450 MB</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="restore-options">
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="restoreData" checked>
                                Restaurer les données
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="restoreFiles">
                                Restaurer les fichiers
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="restoreConfig">
                                Restaurer la configuration
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-cancel">Annuler</button>
                    <button class="btn-danger" id="confirmRestore">
                        <i class="fas fa-redo"></i> Restaurer
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Confirmation
        modal.querySelector('#confirmRestore').addEventListener('click', function() {
            if (!modal.querySelector('input[name="backupSelect"]:checked')) {
                alert('Veuillez sélectionner une sauvegarde');
                return;
            }
            
            if (!confirm('ATTENTION: Cette action écrasera les données actuelles. Voulez-vous continuer ?')) {
                return;
            }
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Restauration...';
            this.disabled = true;
            
            setTimeout(() => {
                modal.remove();
                showToast('Restauration terminée', 'success');
            }, 3000);
        });
        
        // Fermeture
        modal.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });
    });
}

/**
 * Journaux d'audit
 */
function initAuditLogs() {
    // Table des journaux
    initAuditTable();
    
    // Filtres
    initAuditFilters();
    
    // Export
    initAuditExport();
}

/**
 * Table des journaux d'audit
 */
function initAuditTable() {
    const auditTable = document.querySelector('.audit-table');
    if (!auditTable) return;

    // Charger les journaux
    loadAuditLogs();
    
    // Recherche
    initAuditSearch();
}

/**
 * Charger les journaux d'audit
 */
function loadAuditLogs() {
    const logs = [
        { id: 1, timestamp: '2024-12-15 10:30:25', user: 'Admin', action: 'CONNEXION', details: 'Connexion réussie', ip: '192.168.1.1' },
        { id: 2, timestamp: '2024-12-15 09:15:10', user: 'Dr. ADJOVI', action: 'MODIFICATION', details: 'Profil mis à jour', ip: '10.0.0.5' },
        { id: 3, timestamp: '2024-12-14 16:45:30', user: 'System', action: 'BACKUP', details: 'Sauvegarde automatique', ip: '127.0.0.1' },
        { id: 4, timestamp: '2024-12-14 14:20:15', user: 'Examinateur', action: 'EVALUATION', details: 'Candidature évaluée', ip: '192.168.1.100' }
    ];

    const tbody = document.querySelector('.audit-table tbody');
    if (!tbody) return;

    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.timestamp}</td>
            <td>${log.user}</td>
            <td><span class="audit-action action-${log.action.toLowerCase()}">${log.action}</span></td>
            <td>${log.details}</td>
            <td>${log.ip}</td>
            <td>
                <button class="btn-action view-audit-details" data-id="${log.id}">
                    <i class="fas fa-search"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Détails
    document.querySelectorAll('.view-audit-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const logId = this.getAttribute('data-id');
            showAuditDetails(logId);
        });
    });
}

/**
 * Afficher les détails d'un journal
 */
function showAuditDetails(logId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Détails du journal #${logId}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="audit-details">
                    <div class="detail-item">
                        <strong>Horodatage:</strong>
                        <span>2024-12-15 10:30:25</span>
                    </div>
                    <div class="detail-item">
                        <strong>Utilisateur:</strong>
                        <span>Admin</span>
                    </div>
                    <div class="detail-item">
                        <strong>Action:</strong>
                        <span>CONNEXION</span>
                    </div>
                    <div class="detail-item">
                        <strong>Détails:</strong>
                        <p>Connexion réussie depuis le navigateur Chrome sur Windows 10</p>
                    </div>
                    <div class="detail-item">
                        <strong>Adresse IP:</strong>
                        <span>192.168.1.1</span>
                    </div>
                    <div class="detail-item">
                        <strong>User Agent:</strong>
                        <code>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36</code>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary modal-close">Fermer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
}

/**
 * Recherche dans les journaux
 */
function initAuditSearch() {
    const searchInput = document.querySelector('.audit-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.audit-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

/**
 * Filtres d'audit
 */
function initAuditFilters() {
    const filterSelects = document.querySelectorAll('.audit-filter');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyAuditFilters();
        });
    });
}

/**
 * Appliquer les filtres d'audit
 */
function applyAuditFilters() {
    const userFilter = document.querySelector('.audit-filter[data-filter="user"]')?.value;
    const actionFilter = document.querySelector('.audit-filter[data-filter="action"]')?.value;
    const dateFilter = document.querySelector('.audit-filter[data-filter="date"]')?.value;
    
    const rows = document.querySelectorAll('.audit-table tbody tr');
    
    rows.forEach(row => {
        const user = row.querySelector('td:nth-child(2)')?.textContent || '';
        const action = row.querySelector('.audit-action')?.textContent || '';
        const timestamp = row.querySelector('td:nth-child(1)')?.textContent || '';
        const date = new Date(timestamp.split(' ')[0]);
        const now = new Date();
        
        let show = true;
        
        // Filtre par utilisateur
        if (userFilter && userFilter !== 'all' && user !== userFilter) {
            show = false;
        }
        
        // Filtre par action
        if (actionFilter && actionFilter !== 'all' && action !== actionFilter) {
            show = false;
        }
        
        // Filtre par date
        if (dateFilter && dateFilter !== 'all') {
            const diffDays = (now - date) / (1000 * 60 * 60 * 24);
            
            switch(dateFilter) {
                case 'today':
                    if (diffDays > 1) show = false;
                    break;
                case 'week':
                    if (diffDays > 7) show = false;
                    break;
                case 'month':
                    if (diffDays > 30) show = false;
                    break;
            }
        }
        
        row.style.display = show ? '' : 'none';
    });
}

/**
 * Export des journaux
 */
function initAuditExport() {
    const exportBtn = document.getElementById('exportAuditLogs');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', function() {
        const rows = document.querySelectorAll('.audit-table tbody tr');
        const csvData = [];
        
        // En-têtes
        const headers = Array.from(document.querySelectorAll('.audit-table th')).map(th => th.textContent);
        csvData.push(headers);
        
        // Données
        rows.forEach(row => {
            if (row.style.display !== 'none') {
                const cells = Array.from(row.querySelectorAll('td')).map(td => {
                    if (td.querySelector('.audit-action')) {
                        return td.querySelector('.audit-action').textContent;
                    }
                    return td.textContent;
                });
                csvData.push(cells);
            }
        });
        
        // Créer le fichier
        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Journaux exportés', 'success');
    });
}

/**
 * Vérifier la santé du système
 */
function checkSystemHealth() {
    const healthIndicators = document.querySelectorAll('.health-indicator');
    
    healthIndicators.forEach(indicator => {
        const value = Math.random() * 100;
        const fill = indicator.querySelector('.health-fill');
        const text = indicator.querySelector('.health-value');
        
        if (fill && text) {
            fill.style.width = `${value}%`;
            text.textContent = `${Math.round(value)}%`;
            
            // Couleur selon la valeur
            if (value > 90) {
                fill.style.backgroundColor = '#ef4444';
            } else if (value > 70) {
                fill.style.backgroundColor = '#f59e0b';
            } else {
                fill.style.backgroundColor = '#10b981';
            }
        }
    });
}

/**
 * Animation de compteur
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = INSTI.formatNumber(currentValue);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

/**
 * Afficher une notification toast
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Afficher
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Fermer
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto-fermeture
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

/**
 * Obtenir l'icône du toast
 */
function getToastIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'times-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Initialisation complète
window.addEventListener('load', function() {
    // Vérifications périodiques
    setInterval(checkSystemHealth, 30000);
    setInterval(checkBackupStatus, 60000);
    
    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .slide-in {
            animation: slideIn 0.5s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .fade-in {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
