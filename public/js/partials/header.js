/**
 * Header - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeaderMenu();
    initUserMenu();
    initNotifications();
    initSearch();
    initMobileHeader();
    initHeaderAnimations();
});

/**
 * Initialisation du menu principal
 */
function initHeaderMenu() {
    const headerMenu = document.querySelector('.header-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!headerMenu || !menuToggle) return;

    // Toggle du menu mobile
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        headerMenu.classList.toggle('active');
        document.body.style.overflow = headerMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!headerMenu.contains(e.target) && !menuToggle.contains(e.target) && headerMenu.classList.contains('active')) {
            headerMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Gestion des sous-menus
    initSubmenus(headerMenu);

    // Navigation active
    setActiveMenuItem();
}

/**
 * Gestion des sous-menus
 */
function initSubmenus(headerMenu) {
    const menuItemsWithChildren = headerMenu.querySelectorAll('li.has-children');
    
    menuItemsWithChildren.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        if (!submenu) return;

        // Desktop: survol
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                item.classList.add('active');
                submenu.style.display = 'block';
                positionSubmenu(submenu, item);
            }
        });

        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                item.classList.remove('active');
                submenu.style.display = 'none';
            }
        });

        // Mobile: clic
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}

/**
 * Positionner le sous-menu
 */
function positionSubmenu(submenu, parentItem) {
    const rect = parentItem.getBoundingClientRect();
    const submenuRect = submenu.getBoundingClientRect();
    
    // Vérifier si le sous-menu dépasse à droite
    if (rect.right + submenuRect.width > window.innerWidth) {
        submenu.style.left = 'auto';
        submenu.style.right = '0';
    } else {
        submenu.style.left = '0';
        submenu.style.right = 'auto';
    }
    
    // Vérifier si le sous-menu dépasse en bas
    if (rect.bottom + submenuRect.height > window.innerHeight) {
        submenu.style.top = 'auto';
        submenu.style.bottom = '100%';
    } else {
        submenu.style.top = '100%';
        submenu.style.bottom = 'auto';
    }
}

/**
 * Définir l'élément de menu actif
 */
function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.header-menu a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath || currentPath.startsWith(href) && href !== '/') {
            item.classList.add('active');
            item.closest('li.has-children')?.classList.add('active');
        }
    });
}

/**
 * Menu utilisateur
 */
function initUserMenu() {
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    const userMenu = document.querySelector('.user-menu');
    
    if (!userMenuToggle || !userMenu) return;

    userMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenu.classList.toggle('show');
    });

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', function() {
        userMenu.classList.remove('show');
    });

    // Empêcher la fermeture en cliquant dans le menu
    userMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

/**
 * Gestion des notifications
 */
function initNotifications() {
    const notificationToggle = document.querySelector('.notification-toggle');
    const notificationPanel = document.querySelector('.notification-panel');
    
    if (!notificationToggle || !notificationPanel) return;

    notificationToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationPanel.classList.toggle('show');
        
        // Marquer comme lues
        if (notificationPanel.classList.contains('show')) {
            markNotificationsAsRead();
        }
    });

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!notificationPanel.contains(e.target) && !notificationToggle.contains(e.target)) {
            notificationPanel.classList.remove('show');
        }
    });

    // Charger les notifications
    loadNotifications();
}

/**
 * Charger les notifications
 */
function loadNotifications() {
    const notificationList = document.querySelector('.notification-list');
    if (!notificationList) return;

    // Simulation de chargement
    setTimeout(() => {
        const notifications = [
            {
                id: 1,
                type: 'success',
                icon: 'check-circle',
                title: 'Candidature acceptée',
                message: 'Votre candidature a été acceptée',
                time: 'Il y a 2 heures',
                unread: true
            },
            {
                id: 2,
                type: 'warning',
                icon: 'exclamation-triangle',
                title: 'Document manquant',
                message: 'Veuillez compléter votre dossier',
                time: 'Il y a 1 jour',
                unread: true
            },
            {
                id: 3,
                type: 'info',
                icon: 'bullhorn',
                title: 'Nouvelle offre',
                message: 'Une nouvelle offre correspond à votre profil',
                time: 'Il y a 2 jours',
                unread: false
            }
        ];

        notificationList.innerHTML = '';
        
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
                    markNotificationAsRead(notif.id);
                    this.classList.remove('unread');
                    this.querySelector('.notification-dot')?.remove();
                }
            });
            
            notificationList.appendChild(item);
        });
        
        // Mettre à jour le badge
        updateNotificationBadge(notifications.filter(n => n.unread).length);
    }, 500);
}

/**
 * Marquer les notifications comme lues
 */
function markNotificationsAsRead() {
    const notificationItems = document.querySelectorAll('.notification-item.unread');
    const badge = document.querySelector('.notification-badge');
    
    notificationItems.forEach(item => {
        item.classList.remove('unread');
        const dot = item.querySelector('.notification-dot');
        if (dot) dot.remove();
    });
    
    if (badge) {
        badge.style.display = 'none';
    }
}

/**
 * Marquer une notification comme lue
 */
function markNotificationAsRead(notificationId) {
    // Simulation d'API
    console.log(`Notification ${notificationId} marquée comme lue`);
}

/**
 * Mettre à jour le badge de notification
 */
function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (!badge) return;
    
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    
    if (count > 0) {
        badge.classList.add('pulse');
        setTimeout(() => {
            badge.classList.remove('pulse');
        }, 1000);
    }
}

/**
 * Recherche dans le header
 */
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    
    if (!searchToggle || !searchBox) return;

    // Toggle de la recherche
    searchToggle.addEventListener('click', function() {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            const input = searchBox.querySelector('input');
            input?.focus();
        }
    });

    // Recherche
    const searchForm = searchBox.querySelector('form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });
}

/**
 * Effectuer une recherche
 */
function performSearch(term) {
    console.log('Recherche:', term);
    // Redirection vers la page de résultats
    window.location.href = `/recherche?q=${encodeURIComponent(term)}`;
}

/**
 * Header mobile
 */
function initMobileHeader() {
    const mobileHeader = document.querySelector('.mobile-header');
    if (!mobileHeader) return;

    // Menu hamburger mobile
    const mobileMenuToggle = mobileHeader.querySelector('.mobile-menu-toggle');
    const mobileMenu = mobileHeader.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('show');
        });
    }

    // Recherche mobile
    const mobileSearchToggle = mobileHeader.querySelector('.mobile-search-toggle');
    const mobileSearchBox = mobileHeader.querySelector('.mobile-search-box');
    
    if (mobileSearchToggle && mobileSearchBox) {
        mobileSearchToggle.addEventListener('click', function() {
            mobileSearchBox.classList.toggle('show');
        });
    }

    // Fixer le header au défilement
    initStickyHeader();
}

/**
 * Header sticky
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > headerHeight) {
            header.classList.add('sticky');
            
            // Cacher/montrer au défilement
            if (scrollTop > lastScrollTop) {
                // Défilement vers le bas
                header.classList.add('hidden');
            } else {
                // Défilement vers le haut
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('sticky', 'hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Animations du header
 */
function initHeaderAnimations() {
    // Animation d'entrée
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.transition = 'all 0.6s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 300);
    }

    // Animation des éléments
    const headerItems = document.querySelectorAll('.header-top > *');
    headerItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = `all 0.4s ease ${index * 0.1}s`;
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500);
    });
}

/**
 * Gestion du thème dans le header
 */
function initHeaderTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = this.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        showToast(`Thème ${isDark ? 'sombre' : 'clair'} activé`);
    });

    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }
}

/**
 * Gestion de la langue
 */
function initLanguageSwitcher() {
    const langToggle = document.querySelector('.lang-toggle');
    const langMenu = document.querySelector('.lang-menu');
    
    if (!langToggle || !langMenu) return;

    langToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    // Changer de langue
    langMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            langMenu.classList.remove('show');
        });
    });

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', function() {
        langMenu.classList.remove('show');
    });
}

/**
 * Changer la langue
 */
function changeLanguage(lang) {
    // Simulation de changement de langue
    console.log('Changement de langue:', lang);
    
    // Mettre à jour l'interface
    const langText = langToggle.querySelector('.lang-text');
    const langFlag = langToggle.querySelector('.lang-flag');
    
    if (langText && langFlag) {
        langText.textContent = lang.toUpperCase();
        langFlag.src = `/assets/images/flags/${lang}.svg`;
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('language', lang);
    
    // Recharger la page pour appliquer la traduction
    // window.location.reload();
}

/**
 * Afficher un toast
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
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

// Initialisation complète
window.addEventListener('load', function() {
    initHeaderTheme();
    initLanguageSwitcher();
    
    // Mettre à jour les notifications périodiquement
    setInterval(loadNotifications, 30000);
    
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
        
        header.sticky {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease;
        }
        
        header.sticky.hidden {
            transform: translateY(-100%);
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0a3f8f;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
