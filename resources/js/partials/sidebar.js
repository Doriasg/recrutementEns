/**
 * Sidebar - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebarToggle();
    initSidebarNavigation();
    initSidebarAccordion();
    initSidebarResize();
    initSidebarHover();
    initSidebarAnimations();
    initSidebarTheme();
});

/**
 * Toggle de la sidebar
 */
function initSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (!sidebar || !toggleBtn) return;

    // Toggle au clic
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        this.classList.toggle('active');
        
        // Sauvegarder l'état
        localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
        
        // Ajuster le contenu
        adjustContentForSidebar();
        
        // Émettre un événement
        document.dispatchEvent(new CustomEvent('sidebarToggle', {
            detail: { collapsed: sidebar.classList.contains('collapsed') }
        }));
    });

    // Restaurer l'état précédent
    const wasCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (wasCollapsed) {
        sidebar.classList.add('collapsed');
        toggleBtn.classList.add('active');
    }

    // Initialiser l'ajustement
    adjustContentForSidebar();
}

/**
 * Ajuster le contenu en fonction de la sidebar
 */
function adjustContentForSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content-area') || document.querySelector('main');
    
    if (!sidebar || !content) return;

    if (sidebar.classList.contains('collapsed')) {
        content.style.marginLeft = '80px'; // Largeur de la sidebar réduite
    } else {
        content.style.marginLeft = `${sidebar.offsetWidth}px`;
    }
}

/**
 * Navigation dans la sidebar
 */
function initSidebarNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Gérer les liens externes
            if (this.getAttribute('target') === '_blank') {
                return;
            }
            
            // Gérer les liens avec sous-menus
            const parentLi = this.closest('li');
            if (parentLi && parentLi.classList.contains('has-children')) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    parentLi.classList.toggle('expanded');
                }
                return;
            }
            
            // Mettre à jour l'item actif
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
                navItem.closest('li')?.classList.remove('active');
            });
            
            this.classList.add('active');
            this.closest('li')?.classList.add('active');
            
            // Fermer la sidebar sur mobile
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar')?.classList.remove('show');
                document.querySelector('.sidebar-toggle')?.classList.remove('active');
            }
            
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Définir l'item actif basé sur l'URL
    setActiveSidebarItem();
}

/**
 * Définir l'item actif de la sidebar
 */
function setActiveSidebarItem() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.sidebar-nav a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.startsWith(href)) {
            item.classList.add('active');
            item.closest('li')?.classList.add('active');
            
            // Ouvrir les parents
            let parent = item.closest('li.has-children');
            while (parent) {
                parent.classList.add('expanded');
                parent = parent.parentElement.closest('li.has-children');
            }
        }
    });
}

/**
 * Accordéon pour les sous-menus
 */
function initSidebarAccordion() {
    const parentItems = document.querySelectorAll('.sidebar-nav li.has-children');
    
    parentItems.forEach(item => {
        const link = item.querySelector('> a');
        const submenu = item.querySelector('.submenu');
        
        if (!link || !submenu) return;

        // Desktop: survol
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768 && !document.querySelector('.sidebar').classList.contains('collapsed')) {
                this.classList.add('expanded');
            }
        });

        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768 && !document.querySelector('.sidebar').classList.contains('collapsed')) {
                this.classList.remove('expanded');
            }
        });

        // Mobile: clic
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('expanded');
            }
        });
    });
}

/**
 Redimensionnement de la sidebar
 */
function initSidebarResize() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    let isResizing = false;
    let startX, startWidth;

    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'sidebar-resize-handle';
    sidebar.appendChild(resizeHandle);

    resizeHandle.addEventListener('mousedown', initResize);

    function initResize(e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(getComputedStyle(sidebar).width, 10);
        
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        
        e.preventDefault();
    }

    function resize(e) {
        if (!isResizing) return;
        
        const width = startWidth + (e.clientX - startX);
        const minWidth = 200;
        const maxWidth = 400;
        
        if (width >= minWidth && width <= maxWidth) {
            sidebar.style.width = `${width}px`;
            adjustContentForSidebar();
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
        
        // Sauvegarder la largeur
        localStorage.setItem('sidebar-width', sidebar.style.width);
    }

    // Restaurer la largeur sauvegardée
    const savedWidth = localStorage.getItem('sidebar-width');
    if (savedWidth) {
        sidebar.style.width = savedWidth;
        adjustContentForSidebar();
    }

    // Redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        adjustContentForSidebar();
        handleMobileSidebar();
    });
}

/**
 * Gestion de la sidebar sur mobile
 */
function handleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (!sidebar || !toggleBtn) return;

    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile');
        sidebar.classList.remove('collapsed');
        toggleBtn.style.display = 'none';
    } else {
        sidebar.classList.remove('mobile');
        toggleBtn.style.display = 'flex';
        
        // Restaurer l'état précédent
        const wasCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (wasCollapsed) {
            sidebar.classList.add('collapsed');
            toggleBtn.classList.add('active');
        }
    }
    
    adjustContentForSidebar();
}

/**
 * Effets de survol
 */
function initSidebarHover() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Tooltips pour la sidebar réduite
    const navItems = sidebar.querySelectorAll('.sidebar-nav a');
    
    sidebar.addEventListener('mouseenter', function() {
        if (this.classList.contains('collapsed')) {
            navItems.forEach(item => {
                const tooltip = document.createElement('div');
                tooltip.className = 'sidebar-tooltip';
                tooltip.textContent = item.querySelector('span')?.textContent || '';
                
                const rect = item.getBoundingClientRect();
                tooltip.style.top = `${rect.top}px`;
                tooltip.style.left = `${rect.right + 10}px`;
                
                document.body.appendChild(tooltip);
                item._tooltip = tooltip;
            });
        }
    });

    sidebar.addEventListener('mouseleave', function() {
        if (this.classList.contains('collapsed')) {
            navItems.forEach(item => {
                if (item._tooltip) {
                    item._tooltip.remove();
                    delete item._tooltip;
                }
            });
        }
    });
}

/**
 * Animations de la sidebar
 */
function initSidebarAnimations() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Animation d'entrée
    sidebar.style.opacity = '0';
    sidebar.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        sidebar.style.transition = 'all 0.5s ease';
        sidebar.style.opacity = '1';
        sidebar.style.transform = 'translateX(0)';
    }, 300);

    // Animation des items
    const navItems = sidebar.querySelectorAll('.sidebar-nav li');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            item.style.transition = `all 0.3s ease ${index * 0.05}s`;
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500);
    });

    // Animation du footer
    const sidebarFooter = sidebar.querySelector('.sidebar-footer');
    if (sidebarFooter) {
        sidebarFooter.style.opacity = '0';
        sidebarFooter.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            sidebarFooter.style.transition = 'all 0.5s ease 0.2s';
            sidebarFooter.style.opacity = '1';
            sidebarFooter.style.transform = 'translateY(0)';
        }, 700);
    }
}

/**
 * Thème de la sidebar
 */
function initSidebarTheme() {
    const themeToggle = document.querySelector('.sidebar-theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        sidebar.classList.toggle('dark');
        localStorage.setItem('sidebar-theme', sidebar.classList.contains('dark') ? 'dark' : 'light');
        
        const icon = this.querySelector('i');
        if (icon) {
            icon.className = sidebar.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
        }
    });

    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('sidebar-theme');
    const sidebar = document.querySelector('.sidebar');
    
    if (savedTheme === 'dark' && sidebar) {
        sidebar.classList.add('dark');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }
}

/**
 * Badges et indicateurs
 */
function initSidebarBadges() {
    const badgeElements = document.querySelectorAll('.sidebar-badge');
    
    badgeElements.forEach(badge => {
        // Animation pour les nouveaux badges
        if (badge.classList.contains('new')) {
            badge.style.animation = 'pulse 2s infinite';
            
            // Arrêter l'animation après 5 secondes
            setTimeout(() => {
                badge.style.animation = '';
                badge.classList.remove('new');
            }, 5000);
        }
        
        // Mettre à jour dynamiquement
        setInterval(() => {
            updateBadgeCount(badge);
        }, 30000);
    });
}

/**
 * Mettre à jour le compteur d'un badge
 */
function updateBadgeCount(badge) {
    const currentCount = parseInt(badge.textContent) || 0;
    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, ou +1
    const newCount = Math.max(0, currentCount + change);
    
    if (newCount !== currentCount) {
        // Animation
        badge.style.transform = 'scale(1.2)';
        badge.textContent = newCount;
        
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 300);
        
        // Changer la couleur selon le niveau
        if (newCount > 10) {
            badge.style.backgroundColor = '#ef4444';
        } else if (newCount > 5) {
            badge.style.backgroundColor = '#f59e0b';
        } else {
            badge.style.backgroundColor = '#3b82f6';
        }
    }
}

/**
 * Recherche dans la sidebar
 */
function initSidebarSearch() {
    const searchInput = document.querySelector('.sidebar-search input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const navItems = document.querySelectorAll('.sidebar-nav li');
        
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const isParent = item.classList.contains('has-children');
            
            if (text.includes(searchTerm)) {
                item.style.display = '';
                
                // Montrer les enfants
                if (isParent) {
                    item.classList.add('expanded');
                }
            } else {
                // Vérifier si un enfant correspond
                const childMatches = Array.from(item.querySelectorAll('li')).some(child => 
                    child.textContent.toLowerCase().includes(searchTerm)
                );
                
                if (childMatches) {
                    item.style.display = '';
                    item.classList.add('expanded');
                } else {
                    item.style.display = 'none';
                }
            }
        });
        
        // Afficher/masquer les sections
        const sections = document.querySelectorAll('.sidebar-section');
        sections.forEach(section => {
            const visibleItems = Array.from(section.querySelectorAll('li')).filter(li => 
                li.style.display !== 'none'
            );
            
            if (visibleItems.length > 0) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    // Réinitialiser la recherche
    const clearBtn = document.querySelector('.sidebar-search .clear-search');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        });
    }
}

/**
 * Gestion des états de la sidebar
 */
function saveSidebarState() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const state = {
        collapsed: sidebar.classList.contains('collapsed'),
        width: sidebar.style.width,
        theme: sidebar.classList.contains('dark') ? 'dark' : 'light',
        expandedItems: Array.from(sidebar.querySelectorAll('.expanded')).map(item => 
            item.querySelector('a')?.getAttribute('href')
        ).filter(Boolean)
    };
    
    localStorage.setItem('sidebar-state', JSON.stringify(state));
}

/**
 * Restaurer l'état de la sidebar
 */
function restoreSidebarState() {
    const savedState = localStorage.getItem('sidebar-state');
    if (!savedState) return;

    const state = JSON.parse(savedState);
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) return;

    // Restaurer l'état réduit/étendu
    if (state.collapsed) {
        sidebar.classList.add('collapsed');
        document.querySelector('.sidebar-toggle')?.classList.add('active');
    }

    // Restaurer la largeur
    if (state.width) {
        sidebar.style.width = state.width;
    }

    // Restaurer le thème
    if (state.theme === 'dark') {
        sidebar.classList.add('dark');
        const icon = document.querySelector('.sidebar-theme-toggle i');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }

    // Restaurer les items étendus
    if (state.expandedItems && state.expandedItems.length > 0) {
        state.expandedItems.forEach(href => {
            const item = sidebar.querySelector(`a[href="${href}"]`)?.closest('li.has-children');
            if (item) {
                item.classList.add('expanded');
            }
        });
    }
}

/**
 * Gestion des permissions dans la sidebar
 */
function initSidebarPermissions() {
    const userRole = document.body.getAttribute('data-user-role');
    if (!userRole) return;

    // Masquer les éléments non autorisés
    const restrictedItems = document.querySelectorAll(`[data-role]:not([data-role*="${userRole}"])`);
    restrictedItems.forEach(item => {
        item.style.display = 'none';
    });

    // Ajuster les sections vides
    const sections = document.querySelectorAll('.sidebar-section');
    sections.forEach(section => {
        const visibleItems = Array.from(section.querySelectorAll('li')).filter(li => 
            li.style.display !== 'none'
        );
        
        if (visibleItems.length === 0) {
            section.style.display = 'none';
        }
    });
}

/**
 * Rafraîchissement en temps réel
 */
function initSidebarLiveUpdates() {
    // Mettre à jour les indicateurs périodiquement
    setInterval(() => {
        updateSidebarIndicators();
    }, 60000);
}

/**
 * Mettre à jour les indicateurs de la sidebar
 */
function updateSidebarIndicators() {
    // Mettre à jour les badges
    document.querySelectorAll('.sidebar-badge').forEach(updateBadgeCount);
    
    // Mettre à jour les indicateurs de progression
    document.querySelectorAll('.progress-tag').forEach(tag => {
        const progress = parseInt(tag.textContent) || 0;
        const change = Math.floor(Math.random() * 5) - 2; // -2 à +2
        const newProgress = Math.max(0, Math.min(100, progress + change));
        
        if (newProgress !== progress) {
            tag.textContent = `${newProgress}%`;
            tag.style.backgroundColor = getProgressColor(newProgress);
        }
    });
    
    // Mettre à jour les états
    document.querySelectorAll('.status-indicator').forEach(indicator => {
        const states = ['success', 'warning', 'danger', 'info'];
        const currentState = Array.from(indicator.classList).find(c => c.startsWith('status-'));
        const newState = states[Math.floor(Math.random() * states.length)];
        
        if (currentState !== `status-${newState}`) {
            indicator.className = `status-indicator status-${newState}`;
        }
    });
}

/**
 * Obtenir la couleur de progression
 */
function getProgressColor(progress) {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#3b82f6';
    if (progress >= 40) return '#f59e0b';
    return '#ef4444';
}

// Initialisation complète
window.addEventListener('load', function() {
    handleMobileSidebar();
    restoreSidebarState();
    initSidebarBadges();
    initSidebarSearch();
    initSidebarPermissions();
    initSidebarLiveUpdates();
    
    // Sauvegarder l'état périodiquement
    setInterval(saveSidebarState, 30000);
    
    // Sauvegarder à la fermeture
    window.addEventListener('beforeunload', saveSidebarState);
    
    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .sidebar-resize-handle {
            position: absolute;
            top: 0;
            right: 0;
            width: 4px;
            height: 100%;
            cursor: col-resize;
            background: transparent;
            transition: background 0.2s;
        }
        
        .sidebar-resize-handle:hover {
            background: rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-tooltip {
            position: fixed;
            background: #1e293b;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 10000;
            pointer-events: none;
            animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .sidebar.mobile {
            position: fixed;
            top: 0;
            left: -280px;
            height: 100vh;
            z-index: 1000;
            transition: left 0.3s ease;
        }
        
        .sidebar.mobile.show {
            left: 0;
        }
        
        .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        }
        
        .sidebar.mobile.show + .sidebar-overlay {
            display: block;
        }
    `;
    document.head.appendChild(style);
    
    // Créer l'overlay pour mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', function() {
        document.querySelector('.sidebar')?.classList.remove('show');
        document.querySelector('.sidebar-toggle')?.classList.remove('active');
    });
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth <= 768) {
        sidebar.parentNode.insertBefore(overlay, sidebar.nextSibling);
    }
});
