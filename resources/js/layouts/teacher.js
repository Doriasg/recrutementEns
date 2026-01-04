/**
 * Layout Teacher - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initNotifications();
    initQuickStats();
    initMobileMenu();
    initProfileDropdown();
    initThemeToggle();
});

/**
 * Initialisation de la sidebar
 */
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sidebar || !menuToggle) return;

    // Toggle sidebar sur mobile
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        this.classList.toggle('active');
        
        // Sauvegarder l'état
        localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
    });

    // Items actifs
    const navItems = sidebar.querySelectorAll('.sidebar-nav li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animation des sous-menus
    const hasChildren = sidebar.querySelectorAll('.has-children');
    hasChildren.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        if (submenu) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth > 768) {
                    e.preventDefault();
                    item.classList.toggle('expanded');
                }
            });
        }
    });

    // Redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('mobile');
            sidebar.classList.remove('collapsed');
        } else {
            sidebar.classList.remove('mobile');
            
            // Restaurer l'état précédent
            const wasCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
            if (wasCollapsed) {
                sidebar.classList.add('collapsed');
            }
        }
    });

    // Initialiser l'état
    window.dispatchEvent(new Event('resize'));
}

/**
 * Gestion des notifications
 */
function initNotifications() {
    const notificationBell = document.getElementById('notificationItem');
    const notificationBadge = document.getElementById('notificationBadge');
    
    if (!notificationBell || !notificationBadge) return;

    // Charger les notifications
    loadTeacherNotifications();

    // Ouvrir le panneau des notifications
    notificationBell.addEventListener('click', function(e) {
        e.preventDefault();
        openNotificationPanel();
    });

    // Marquer comme lues
    document.addEventListener('click', function(e) {
        if (e.target.closest('.notification-item') && !e.target.closest('.notification-actions')) {
            const notification = e.target.closest('.notification-item');
            notification.classList.remove('unread');
            
            // Mettre à jour le badge
            updateNotificationBadge();
        }
    });
}

/**
 * Charger les notifications de l'enseignant
 */
function loadTeacherNotifications() {
    // Simulation de chargement
    setTimeout(() => {
        const notifications = [
            {
                id: 1,
                type: 'success',
                icon: 'check-circle',
                title: 'Candidature acceptée',
                message: 'Votre candidature pour le poste d\'enseignant en Informatique a été acceptée',
                time: 'Il y a 2 heures',
                unread: true
            },
            {
                id: 2,
                type: 'warning',
                icon: 'exclamation-triangle',
                title: 'Document manquant',
                message: 'Votre diplôme de doctorat n\'a pas été validé',
                time: 'Il y a 1 jour',
                unread: true
            },
            {
                id: 3,
                type: 'info',
                icon: 'bullhorn',
                title: 'Nouvelle offre',
                message: 'Une nouvelle offre en Génie Électrique correspond à votre profil',
                time: 'Il y a 2 jours',
                unread: false
            }
        ];

        updateNotificationBadge(notifications.filter(n => n.unread).length);
    }, 1000);
}

/**
 * Mettre à jour le badge de notification
 */
function updateNotificationBadge(count) {
    const badge = document.getElementById('notificationBadge');
    if (!badge) return;

    if (count !== undefined) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    } else {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

/**
 * Ouvrir le panneau de notifications
 */
function openNotificationPanel() {
    let panel = document.getElementById('notificationPanel');
    
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.className = 'notification-panel';
        
        // Le contenu sera chargé dynamiquement
        panel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <div class="notification-actions">
                    <button id="markAllRead">Tout marquer comme lu</button>
                    <button id="clearAll">Tout effacer</button>
                </div>
                <button class="close-panel">&times;</button>
            </div>
            <div class="notification-list">
                <div class="loading-notifications">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Chargement des notifications...</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Actions sur les notifications
        panel.querySelector('#markAllRead').addEventListener('click', function() {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            updateNotificationBadge(0);
            showToast('Toutes les notifications ont été marquées comme lues');
        });
        
        panel.querySelector('#clearAll').addEventListener('click', function() {
            if (confirm('Voulez-vous effacer toutes les notifications ?')) {
                panel.querySelector('.notification-list').innerHTML = `
                    <div class="empty-notifications">
                        <i class="fas fa-bell-slash"></i>
                        <p>Aucune notification</p>
                    </div>
                `;
                updateNotificationBadge(0);
            }
        });
        
        panel.querySelector('.close-panel').addEventListener('click', function() {
            panel.classList.remove('show');
        });
    }
    
    // Charger les notifications
    loadPanelNotifications(panel);
    
    // Afficher le panneau
    panel.classList.add('show');
}

/**
 * Charger les notifications dans le panneau
 */
function loadPanelNotifications(panel) {
    const list = panel.querySelector('.notification-list');
    
    // Simulation de chargement
    setTimeout(() => {
        const notifications = [
            {
                id: 1,
                type: 'success',
                icon: 'check-circle',
                title: 'Candidature acceptée',
                message: 'Votre candidature pour le poste d\'enseignant en Informatique a été acceptée',
                time: 'Il y a 2 heures',
                unread: true
            },
            {
                id: 2,
                type: 'warning',
                icon: 'exclamation-triangle',
                title: 'Document manquant',
                message: 'Votre diplôme de doctorat n\'a pas été validé',
                time: 'Il y a 1 jour',
                unread: true
            },
            {
                id: 3,
                type: 'info',
                icon: 'bullhorn',
                title: 'Nouvelle offre',
                message: 'Une nouvelle offre en Génie Électrique correspond à votre profil',
                time: 'Il y a 2 jours',
                unread: false
            },
            {
                id: 4,
                type: 'info',
                icon: 'calendar-alt',
                title: 'Entretien programmé',
                message: 'Votre entretien est prévu pour le 20 janvier 2025 à 10h00',
                time: 'Il y a 3 jours',
                unread: false
            }
        ];
        
        list.innerHTML = '';
        
        notifications.forEach(notif => {
            const item = document.createElement('div');
            item.className = `notification-item ${notif.unread ? 'unread' : ''}`;
            item.innerHTML = `
                <div class="notification-icon ${notif.type}">
                    <i class="fas fa-${notif.icon}"></i>
                </div>
                <div class="notification-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.message}</p>
                    <small>${notif.time}</small>
                </div>
                ${notif.unread ? '<div class="notification-dot"></div>' : ''}
            `;
            
            item.addEventListener('click', function() {
                if (notif.unread) {
                    this.classList.remove('unread');
                    this.querySelector('.notification-dot')?.remove();
                    updateNotificationBadge();
                }
                
                // Action spécifique selon le type
                handleNotificationClick(notif);
            });
            
            list.appendChild(item);
        });
    }, 500);
}

/**
 * Gérer le clic sur une notification
 */
function handleNotificationClick(notification) {
    switch(notification.type) {
        case 'success':
            // Rediriger vers les candidatures
            window.location.href = '/teacher/applications';
            break;
        case 'warning':
            // Rediriger vers les documents
            window.location.href = '/teacher/documents';
            break;
        case 'info':
            if (notification.icon === 'bullhorn') {
                window.location.href = '/teacher/offers';
            } else if (notification.icon === 'calendar-alt') {
                showCalendarModal();
            }
            break;
    }
}

/**
 * Afficher une modale calendrier
 */
function showCalendarModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Entretien programmé</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="interview-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <div>
                            <strong>Date</strong>
                            <p>20 janvier 2025</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <strong>Heure</strong>
                            <p>10h00 - 11h00</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <strong>Lieu</strong>
                            <p>Salle de réunion B, Bâtiment principal</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-user-tie"></i>
                        <div>
                            <strong>Interlocuteur</strong>
                            <p>Dr. KOFFI Mensah</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Fermer</button>
                <button class="btn-primary" id="addToCalendar">
                    <i class="fas fa-calendar-plus"></i> Ajouter au calendrier
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestion des événements
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-cancel').addEventListener('click', () => modal.remove());
    
    modal.querySelector('#addToCalendar').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-check"></i> Ajouté !';
        this.disabled = true;
        setTimeout(() => modal.remove(), 1500);
    });
}

/**
 * Initialisation des statistiques rapides
 */
function initQuickStats() {
    const statsCards = document.querySelectorAll('.stats-card');
    
    statsCards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Mettre à jour les statistiques
        updateCardStats(card);
    });
}

/**
 * Mettre à jour les statistiques d'une carte
 */
function updateCardStats(card) {
    const stats = card.querySelectorAll('li');
    
    stats.forEach(stat => {
        const valueElement = stat.querySelector('strong');
        if (!valueElement) return;
        
        const currentValue = parseInt(valueElement.textContent);
        const targetValue = currentValue + Math.floor(Math.random() * 5);
        
        // Animation de compteur
        animateCounter(valueElement, currentValue, targetValue, 1000);
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
        element.textContent = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

/**
 * Menu mobile amélioré
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
        this.classList.toggle('active');
    });
    
    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

/**
 * Dropdown du profil
 */
function initProfileDropdown() {
    const profileToggle = document.querySelector('.profile-toggle');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (!profileToggle || !profileDropdown) return;
    
    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });
    
    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', function() {
        profileDropdown.classList.remove('show');
    });
}

/**
 * Toggle du thème
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark-theme');
        localStorage.setItem('teacher-theme', isDark ? 'dark' : 'light');
        
        const icon = this.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        showToast(`Thème ${isDark ? 'sombre' : 'clair'} activé`);
    });
    
    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('teacher-theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }
}

/**
 * Gestion des onglets
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Mettre à jour les boutons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mettre à jour les panneaux
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialisation des tooltips
 */
function initTeacherTooltips() {
    tippy('[data-tippy-content]', {
        arrow: true,
        animation: 'scale',
        theme: 'light',
        placement: 'top'
    });
}

/**
 * Gestion du chargement progressif
 */
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-lazy');
                
                if (element.tagName === 'IMG') {
                    element.src = src;
                } else if (element.tagName === 'IFRAME') {
                    element.src = src;
                } else {
                    element.style.backgroundImage = `url('${src}')`;
                }
                
                element.classList.remove('lazy');
                observer.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => observer.observe(element));
}

// Initialisation complète
window.addEventListener('load', function() {
    initTabs();
    initTeacherTooltips();
    initLazyLoading();
    
    // Mettre à jour les statistiques périodiquement
    setInterval(() => {
        document.querySelectorAll('.stats-card').forEach(updateCardStats);
    }, 30000);
});
