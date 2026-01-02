/**
 * INSTI - Dashboard Administrateur
 * Gestion du tableau de bord admin
 */

document.addEventListener('DOMContentLoaded', function() {
    initDashboardCharts();
    initRealTimeUpdates();
    initActivityFilters();
    initQuickActions();
    initSystemHealthMonitoring();
});

/**
 * Initialisation des graphiques du dashboard
 */
function initDashboardCharts() {
    // Applications par département (Chart.js)
    const deptChart = document.getElementById('applicationsByDepartment');
    if (deptChart) {
        const ctx = deptChart.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Génie Électrique',
                    'Informatique',
                    'Génie Mécanique',
                    'Génie Civil',
                    'Science Fondamentale'
                ],
                datasets: [{
                    data: [85, 72, 48, 35, 25],
                    backgroundColor: [
                        '#0a3f8f',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverOffset: 15
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
                            pointStyle: 'circle',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} candidatures (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Évolution des candidatures (Chart.js)
    const trendChart = document.getElementById('applicationsTrend');
    if (trendChart) {
        const ctx = trendChart.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
                datasets: [{
                    label: 'Candidatures',
                    data: [45, 52, 48, 61, 58, 65, 72, 68, 75, 82, 78, 85],
                    borderColor: '#0a3f8f',
                    backgroundColor: 'rgba(10, 63, 143, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0a3f8f',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            family: 'Inter, sans-serif'
                        },
                        bodyFont: {
                            size: 13,
                            family: 'Inter, sans-serif'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            },
                            color: '#64748b'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            },
                            color: '#64748b'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

/**
 * Mises à jour en temps réel
 */
function initRealTimeUpdates() {
    // Mise à jour des métriques
    setInterval(updateMetrics, 30000);
    
    // Mise à jour des activités
    setInterval(loadNewActivities, 60000);
    
    // Vérification du statut système
    setInterval(checkSystemStatus, 120000);
}

/**
 * Mise à jour des métriques
 */
function updateMetrics() {
    // Simulation de nouvelles données
    const metrics = [
        { selector: '.metrics-grid .metric-card:nth-child(1) h3', min: 1240, max: 1260 },
        { selector: '.metrics-grid .metric-card:nth-child(2) h3', min: 22, max: 26 },
        { selector: '.metrics-grid .metric-card:nth-child(3) h3', min: 350, max: 365 },
        { selector: '.metrics-grid .metric-card:nth-child(4) h3', min: 3, max: 7 }
    ];
    
    metrics.forEach(metric => {
        const element = document.querySelector(metric.selector);
        if (element) {
            const currentValue = parseInt(element.textContent.replace(/,/g, ''));
            const newValue = Math.floor(Math.random() * (metric.max - metric.min + 1)) + metric.min;
            
            if (newValue !== currentValue) {
                animateCounter(element, currentValue, newValue);
            }
        }
    });
}

/**
 * Animation de compteur
 */
function animateCounter(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = currentValue.toLocaleString('fr-FR');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Chargement des nouvelles activités
 */
function loadNewActivities() {
    // Simulation d'AJAX
    fetch('/api/admin/recent-activities')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                updateActivityList(data);
            }
        })
        .catch(error => {
            console.error('Erreur chargement activités:', error);
        });
}

/**
 * Mise à jour de la liste des activités
 */
function updateActivityList(activities) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    // Ajouter les nouvelles activités
    activities.forEach(activity => {
        const activityItem = createActivityItem(activity);
        activityList.insertBefore(activityItem, activityList.firstChild);
    });
    
    // Limiter à 10 éléments
    const items = activityList.querySelectorAll('.activity-item');
    if (items.length > 10) {
        for (let i = 10; i < items.length; i++) {
            items[i].remove();
        }
    }
    
    // Animation d'entrée
    activityList.querySelectorAll('.activity-item').forEach((item, index) => {
        if (index < activities.length) {
            item.style.animation = 'slideIn 0.5s ease forwards';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
        }
    });
}

/**
 * Création d'un élément d'activité
 */
function createActivityItem(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    
    const iconClass = {
        'success': 'fas fa-check-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle',
        'danger': 'fas fa-times-circle'
    }[activity.type] || 'fas fa-info-circle';
    
    const iconColor = {
        'success': '#10b981',
        'warning': '#f59e0b',
        'info': '#3b82f6',
        'danger': '#ef4444'
    }[activity.type] || '#64748b';
    
    div.innerHTML = `
        <div class="activity-icon" style="background: ${iconColor}20; color: ${iconColor};">
            <i class="${iconClass}"></i>
        </div>
        <div class="activity-content">
            <div class="activity-title">
                <strong>${activity.title}</strong>
                <span class="activity-time">${activity.time}</span>
            </div>
            <p class="activity-desc">${activity.description}</p>
            <div class="activity-meta">
                ${activity.tags.map(tag => `<span class="badge badge-light">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return div;
}

/**
 * Filtrage des activités
 */
function initActivityFilters() {
    const filterButtons = document.querySelectorAll('[data-activity-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-activity-filter');
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les activités
            const activities = document.querySelectorAll('.activity-item');
            activities.forEach(activity => {
                if (filter === 'all') {
                    activity.style.display = '';
                } else {
                    const activityType = activity.querySelector('.activity-icon i').className;
                    const shouldShow = activityType.includes(filter);
                    activity.style.display = shouldShow ? '' : 'none';
                }
            });
        });
    });
}

/**
 * Actions rapides
 */
function initQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.getAttribute('data-action') || this.querySelector('span').textContent.toLowerCase();
            
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Exécuter l'action correspondante
            switch(action) {
                case 'ajouter utilisateur':
                    window.location.href = '/admin/users/create';
                    break;
                case 'créer offre':
                    window.location.href = '/admin/offers/create';
                    break;
                case 'configuration':
                    window.location.href = '/admin/settings';
                    break;
                case 'rapports':
                    window.location.href = '/admin/reports';
                    break;
                case 'sauvegarde':
                    triggerBackup();
                    break;
                case 'journaux':
                    window.location.href = '/admin/logs';
                    break;
                default:
                    console.log('Action non implémentée:', action);
            }
        });
    });
}

/**
 * Déclencher une sauvegarde
 */
function triggerBackup() {
    // Simulation de sauvegarde
    const backupBtn = document.querySelector('[data-action="sauvegarde"]');
    if (backupBtn) {
        const originalText = backupBtn.querySelector('span').textContent;
        const originalIcon = backupBtn.querySelector('i').className;
        
        // Mettre à jour l'état
        backupBtn.querySelector('span').textContent = 'Sauvegarde en cours...';
        backupBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        backupBtn.disabled = true;
        
        // Simulation
        setTimeout(() => {
            backupBtn.querySelector('span').textContent = 'Sauvegarde terminée';
            backupBtn.querySelector('i').className = 'fas fa-check';
            
            // Réinitialiser après 3 secondes
            setTimeout(() => {
                backupBtn.querySelector('span').textContent = originalText;
                backupBtn.querySelector('i').className = originalIcon;
                backupBtn.disabled = false;
            }, 3000);
        }, 2000);
    }
}

/**
 * Surveillance de la santé du système
 */
function initSystemHealthMonitoring() {
    // Barres de progression
    const indicators = document.querySelectorAll('.indicator-bar');
    
    indicators.forEach(indicator => {
        const fill = indicator.querySelector('.bar-fill');
        const value = parseFloat(indicator.closest('.indicator').querySelector('strong').textContent);
        
        // Animation initiale
        setTimeout(() => {
            fill.style.width = value + '%';
        }, 500);
        
        // Mise à jour périodique
        setInterval(() => {
            updateSystemIndicator(indicator);
        }, 30000);
    });
    
    // Alertes système
    checkSystemAlerts();
}

/**
 * Mise à jour des indicateurs système
 */
function updateSystemIndicator(indicator) {
    const label = indicator.closest('.indicator').querySelector('span').textContent;
    const fill = indicator.querySelector('.bar-fill');
    const valueElement = indicator.closest('.indicator').querySelector('strong');
    
    let newValue, newColor;
    
    switch(label.trim()) {
        case 'Serveur Web':
            newValue = 100; // Toujours à 100% pour la démo
            newColor = '#10b981';
            break;
        case 'Base de données':
            newValue = Math.floor(Math.random() * 5) + 88; // 88-92%
            newColor = newValue > 90 ? '#10b981' : '#f59e0b';
            break;
        case 'Stockage':
            newValue = Math.min(100, parseFloat(valueElement.textContent) + 0.5);
            newColor = newValue > 85 ? '#ef4444' : newValue > 75 ? '#f59e0b' : '#10b981';
            break;
        case 'Performance':
            newValue = Math.floor(Math.random() * 10) + 80; // 80-90%
            newColor = newValue > 85 ? '#10b981' : '#f59e0b';
            break;
        default:
            return;
    }
    
    // Animation de la barre
    fill.style.transition = 'width 1s ease, background-color 0.5s ease';
    fill.style.width = newValue + '%';
    fill.style.backgroundColor = newColor;
    
    // Mise à jour de la valeur
    valueElement.textContent = newValue + '%';
}

/**
 * Vérification des alertes système
 */
function checkSystemAlerts() {
    // Simulation de vérification
    setTimeout(() => {
        const hasAlerts = Math.random() > 0.7; // 30% de chance d'avoir une alerte
        
        if (hasAlerts) {
            showSystemAlert();
        }
    }, 10000);
}

/**
 * Affichage d'une alerte système
 */
function showSystemAlert() {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'system-alert';
    alertContainer.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
                <strong>Alerte système</strong>
                <p>Utilisation élevée du stockage détectée (92%). Veuillez effectuer un nettoyage.</p>
            </div>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Animation d'entrée
    setTimeout(() => {
        alertContainer.classList.add('show');
    }, 100);
    
    // Fermer l'alerte
    alertContainer.querySelector('.alert-close').addEventListener('click', () => {
        alertContainer.classList.remove('show');
        setTimeout(() => {
            alertContainer.remove();
        }, 300);
    });
    
    // Fermeture automatique après 10 secondes
    setTimeout(() => {
        if (document.body.contains(alertContainer)) {
            alertContainer.classList.remove('show');
            setTimeout(() => {
                alertContainer.remove();
            }, 300);
        }
    }, 10000);
}

/**
 * Animation CSS
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    
    .system-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        z-index: 10000;
        transform: translateX(120%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .system-alert.show {
        transform: translateX(0);
    }
    
    .alert-content {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        padding: 20px;
        border-left: 4px solid #f59e0b;
    }
    
    .alert-content i {
        color: #f59e0b;
        font-size: 24px;
        margin-top: 2px;
    }
    
    .alert-content div {
        flex: 1;
    }
    
    .alert-content strong {
        display: block;
        color: #1e293b;
        font-size: 16px;
        margin-bottom: 5px;
    }
    
    .alert-content p {
        color: #64748b;
        font-size: 14px;
        margin: 0;
        line-height: 1.5;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        margin-left: 10px;
        transition: color 0.3s;
    }
    
    .alert-close:hover {
        color: #ef4444;
    }
`;
document.head.appendChild(style);
