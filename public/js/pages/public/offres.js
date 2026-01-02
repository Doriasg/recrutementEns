/**
 * Page Offres - INSTI Plateforme
 * Gestion de la page des offres d'emploi
 */

document.addEventListener('DOMContentLoaded', function() {
    initOffersPage();
});

function initOffersPage() {
    // Initialisation des filtres
    initFilters();
    
    // Initialisation du tri
    initSorting();
    
    // Initialisation de la pagination
    initPagination();
    
    // Initialisation des cartes d'offres
    initOfferCards();
    
    // Initialisation de la recherche
    initSearch();
    
    // Gestion des favoris
    initFavorites();
}

/**
 * Initialisation des filtres
 */
function initFilters() {
    const filterForm = document.getElementById('filtersForm');
    if (!filterForm) return;
    
    const filterElements = {
        department: document.getElementById('filterDepartment'),
        contract: document.getElementById('filterContract'),
        deadline: document.getElementById('filterDeadline'),
        applyBtn: document.querySelector('.btn-apply-filter'),
        resetBtn: document.querySelector('.btn-reset-filter')
    };
    
    // Appliquer les filtres
    if (filterElements.applyBtn) {
        filterElements.applyBtn.addEventListener('click', applyFilters);
    }
    
    // Réinitialiser les filtres
    if (filterElements.resetBtn) {
        filterElements.resetBtn.addEventListener('click', resetFilters);
    }
    
    // Appliquer automatiquement sur changement
    Object.values(filterElements).forEach(element => {
        if (element && element.tagName === 'SELECT') {
            element.addEventListener('change', applyFilters);
        }
    });
    
    function applyFilters() {
        const filters = {
            department: filterElements.department?.value || '',
            contract: filterElements.contract?.value || '',
            deadline: filterElements.deadline?.value || ''
        };
        
        // Sauvegarder les filtres dans l'URL
        updateURLFilters(filters);
        
        // Filtrer les offres
        filterOffers(filters);
        
        // Mettre à jour le compteur
        updateOffersCount();
    }
    
    function resetFilters() {
        if (filterElements.department) filterElements.department.value = '';
        if (filterElements.contract) filterElements.contract.value = '';
        if (filterElements.deadline) filterElements.deadline.value = '';
        
        applyFilters();
    }
}

/**
 * Filtrer les offres
 */
function filterOffers(filters) {
    const offerItems = document.querySelectorAll('.offer-item');
    let visibleCount = 0;
    
    offerItems.forEach(item => {
        const department = item.dataset.department || '';
        const contract = item.dataset.contract || '';
        const deadline = new Date(item.dataset.deadline || '');
        const today = new Date();
        
        let show = true;
        
        // Filtre par département
        if (filters.department && department !== filters.department) {
            show = false;
        }
        
        // Filtre par type de contrat
        if (filters.contract && contract !== filters.contract) {
            show = false;
        }
        
        // Filtre par date limite
        if (filters.deadline) {
            const diffTime = deadline - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch(filters.deadline) {
                case '7':
                    if (diffDays > 7) show = false;
                    break;
                case '30':
                    if (diffDays > 30) show = false;
                    break;
                case '90':
                    if (diffDays > 90) show = false;
                    break;
            }
        }
        
        // Afficher/masquer l'offre
        item.style.display = show ? '' : 'none';
        
        if (show) visibleCount++;
    });
    
    return visibleCount;
}

/**
 * Mettre à jour le compteur d'offres
 */
function updateOffersCount() {
    const visibleItems = document.querySelectorAll('.offer-item[style=""]');
    const countElement = document.querySelector('.offers-count');
    
    if (countElement) {
        countElement.textContent = `(${visibleItems.length})`;
    }
}

/**
 * Mettre à jour les filtres dans l'URL
 */
function updateURLFilters(filters) {
    const url = new URL(window.location);
    
    // Supprimer les anciens paramètres
    ['department', 'contract', 'deadline'].forEach(param => {
        url.searchParams.delete(param);
    });
    
    // Ajouter les nouveaux paramètres
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        }
    });
    
    // Mettre à jour l'URL sans recharger la page
    window.history.replaceState({}, '', url);
}

/**
 * Initialisation du tri
 */
function initSorting() {
    const sortSelect = document.querySelector('.sort-options select');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        sortOffers(sortBy);
    });
}

/**
 * Trier les offres
 */
function sortOffers(sortBy) {
    const container = document.querySelector('.offers-list');
    const items = Array.from(container.querySelectorAll('.offer-item[style=""]'));
    
    items.sort((a, b) => {
        switch(sortBy) {
            case 'date':
                const dateA = new Date(a.dataset.publicationDate || '');
                const dateB = new Date(b.dataset.publicationDate || '');
                return dateB - dateA;
                
            case 'deadline':
                const deadlineA = new Date(a.dataset.deadline || '');
                const deadlineB = new Date(b.dataset.deadline || '');
                return deadlineA - deadlineB;
                
            case 'department':
                const deptA = a.dataset.department || '';
                const deptB = b.dataset.department || '';
                return deptA.localeCompare(deptB);
                
            default:
                return 0;
        }
    });
    
    // Réorganiser les éléments
    items.forEach(item => container.appendChild(item));
}

/**
 * Initialisation de la pagination
 */
function initPagination() {
    const pageLinks = document.querySelectorAll('.page-link');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('disabled') || this.classList.contains('active')) {
                return;
            }
            
            // Retirer la classe active de tous les liens
            pageLinks.forEach(l => l.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Charger la page (simulation)
            loadPage(this.dataset.page || this.textContent);
        });
    });
}

/**
 * Charger une page
 */
function loadPage(pageNumber) {
    const loadingElement = document.querySelector('.offers-list');
    
    if (!loadingElement) return;
    
    // Afficher un indicateur de chargement
    loadingElement.style.opacity = '0.5';
    
    // Simulation de chargement
    setTimeout(() => {
        loadingElement.style.opacity = '1';
        
        // Mettre à jour l'URL
        const url = new URL(window.location);
        url.searchParams.set('page', pageNumber);
        window.history.pushState({}, '', url);
        
        // Déclencher un événement personnalisé
        document.dispatchEvent(new CustomEvent('pageChanged', {
            detail: { page: pageNumber }
        }));
    }, 500);
}

/**
 * Initialisation des cartes d'offres
 */
function initOfferCards() {
    const offerCards = document.querySelectorAll('.offer-item');
    
    offerCards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Badge d'urgence
        const deadline = new Date(card.dataset.deadline || '');
        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 7) {
            const badge = card.querySelector('.offer-badge');
            if (badge) {
                badge.classList.add('urgent');
                badge.innerHTML = `<i class="fas fa-exclamation-circle"></i> Urgent`;
            }
        }
    });
}

/**
 * Initialisation de la recherche
 */
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase().trim();
            searchOffers(searchTerm);
        }, 300);
    });
}

/**
 * Recherche dans les offres
 */
function searchOffers(searchTerm) {
    const offerItems = document.querySelectorAll('.offer-item');
    
    if (!searchTerm) {
        // Afficher toutes les offres si la recherche est vide
        offerItems.forEach(item => item.style.display = '');
        updateOffersCount();
        return;
    }
    
    offerItems.forEach(item => {
        const title = item.querySelector('.offer-title')?.textContent.toLowerCase() || '';
        const department = item.querySelector('.offer-department')?.textContent.toLowerCase() || '';
        const description = item.querySelector('.offer-description')?.textContent.toLowerCase() || '';
        
        const matches = title.includes(searchTerm) || 
                       department.includes(searchTerm) || 
                       description.includes(searchTerm);
        
        item.style.display = matches ? '' : 'none';
    });
    
    updateOffersCount();
}

/**
 * Initialisation des favoris
 */
function initFavorites() {
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const offerId = this.dataset.offerId;
            toggleFavorite(offerId, this);
        });
    });
}

/**
 * Basculer l'état favori
 */
function toggleFavorite(offerId, button) {
    const isFavorite = button.classList.contains('active');
    
    // Sauvegarder dans le localStorage
    let favorites = JSON.parse(localStorage.getItem('insti_favorites') || '[]');
    
    if (isFavorite) {
        // Retirer des favoris
        favorites = favorites.filter(id => id !== offerId);
        button.classList.remove('active');
        button.innerHTML = '<i class="far fa-heart"></i>';
        
        window.INSTI?.showToast('Offre retirée des favoris', 'info');
    } else {
        // Ajouter aux favoris
        if (!favorites.includes(offerId)) {
            favorites.push(offerId);
        }
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart"></i>';
        
        window.INSTI?.showToast('Offre ajoutée aux favoris', 'success');
    }
    
    localStorage.setItem('insti_favorites', JSON.stringify(favorites));
    
    // Déclencher un événement personnalisé
    document.dispatchEvent(new CustomEvent('favoritesUpdated', {
        detail: { offerId, isFavorite: !isFavorite }
    }));
}

/**
 * Charger les filtres depuis l'URL au chargement
 */
function loadFiltersFromURL() {
    const url = new URL(window.location);
    const filters = {
        department: url.searchParams.get('department') || '',
        contract: url.searchParams.get('contract') || '',
        deadline: url.searchParams.get('deadline') || ''
    };
    
    // Appliquer les valeurs aux selects
    Object.entries(filters).forEach(([key, value]) => {
        const element = document.getElementById(`filter${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (element && value) {
            element.value = value;
        }
    });
    
    // Appliquer les filtres
    if (Object.values(filters).some(v => v)) {
        setTimeout(() => filterOffers(filters), 100);
    }
}

// Initialiser les filtres depuis l'URL
window.addEventListener('load', loadFiltersFromURL);
