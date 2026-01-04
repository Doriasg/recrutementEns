/**
 * INSTI - Gestion des Offres Admin
 * Gestion des offres d'emploi avec table interactive
 */

document.addEventListener('DOMContentLoaded', function() {
    initOfferTable();
    initOfferFilters();
    initOfferActions();
    initQuickActionsModal();
    initExportFunctionality();
    initDeadlineCountdowns();
    initOfferStatistics();
});

/**
 * Initialisation de la table des offres
 */
function initOfferTable() {
    const table = document.querySelector('.offers-table');
    if (!table) return;
    
    // Tri des colonnes
    initOfferTableSorting(table);
    
    // Tooltips pour les statuts
    initOfferStatusTooltips();
    
    // Pagination
    initOfferPagination();
    
    // Animation des lignes
    animateTableRows();
}

/**
 * Tri de la table des offres
 */
function initOfferTableSorting(table) {
    const sortableHeaders = table.querySelectorAll('th');
    
    sortableHeaders.forEach((header, index) => {
        // Exclure la colonne actions
        if (index === sortableHeaders.length - 1) return;
        
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const currentDirection = this.classList.contains('sorted-asc') ? 'desc' : 'asc';
            
            // Réinitialiser les autres tris
            sortableHeaders.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                h.querySelector('.sort-icon')?.remove();
            });
            
            // Mettre à jour l'en-tête actuel
            this.classList.add(`sorted-${currentDirection}`);
            
            const sortIcon = document.createElement('i');
            sortIcon.className = `fas fa-sort-${currentDirection === 'asc' ? 'up' : 'down'} sort-icon`;
            this.appendChild(sortIcon);
            
            // Trier
            sortOffers(table, index, currentDirection);
        });
    });
}

/**
 * Trier les offres
 */
function sortOffers(table, columnIndex, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        let valueA, valueB;
        
        switch(columnIndex) {
            case 0: // Référence
                valueA = a.querySelector('.offer-ref').textContent;
                valueB = b.querySelector('.offer-ref').textContent;
                break;
                
            case 1: // Titre
                valueA = a.querySelector('.offer-title-cell strong').textContent;
                valueB = b.querySelector('.offer-title-cell strong').textContent;
                break;
                
            case 2: // Département
                valueA = a.cells[2].textContent;
                valueB = b.cells[2].textContent;
                break;
                
            case 3: // Type
                valueA = a.querySelector('.type-badge').textContent;
                valueB = b.querySelector('.type-badge').textContent;
                break;
                
            case 4: // Postes
                valueA = parseInt(a.querySelector('.posts-count').textContent);
                valueB = parseInt(b.querySelector('.posts-count').textContent);
                break;
                
            case 5: // Date limite
                const dateA = parseOfferDate(a.querySelector('.deadline-date').textContent);
                const dateB = parseOfferDate(b.querySelector('.deadline-date').textContent);
                valueA = dateA.getTime();
                valueB = dateB.getTime();
                break;
                
            case 6: // Candidatures
                valueA = parseInt(a.querySelector('.applications-cell strong').textContent);
                valueB = parseInt(b.querySelector('.applications-cell strong').textContent);
                break;
                
            case 7: // Statut
                valueA = getOfferStatusValue(a.querySelector('.status-badge').textContent);
                valueB = getOfferStatusValue(b.querySelector('.status-badge').textContent);
                break;
        }
        
        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }
        
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Réorganiser les lignes
    rows.forEach(row => tbody.appendChild(row));
    
    // Animation
    animateOfferSort(table);
}

/**
 * Parser une date d'offre
 */
function parseOfferDate(dateString) {
    if (dateString.toLowerCase().includes('non définie')) {
        return new Date('9999-12-31'); // Date très lointaine pour le tri
    }
    
    const months = {
        'jan': 0, 'fév': 1, 'mar': 2, 'avr': 3, 'mai': 4, 'jun': 5,
        'jul': 6, 'aoû': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'déc': 11
    };
    
    const match = dateString.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
    if (match) {
        const [, day, month, year] = match;
        return new Date(year, months[month.toLowerCase().substr(0, 3)], day);
    }
    
    return new Date(dateString);
}

/**
 * Obtenir la valeur d'un statut d'offre
 */
function getOfferStatusValue(statusText) {
    const statusMap = {
        'active': 1,
        'draft': 2,
        'closed': 3
    };
    
    const key = statusText.toLowerCase();
    return statusMap[key] || 0;
}

/**
 * Animation de tri des offres
 */
function animateOfferSort(table) {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach((row, index) => {
        row.style.animation = `slideInRow 0.3s ease ${index * 0.05}s forwards`;
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
    });
}

/**
 * Filtres des offres
 */
function initOfferFilters() {
    // Recherche
    const searchInput = document.getElementById('offerSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            searchOffers(this.value);
        }, 300));
    }
    
    // Filtres par statut
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filter = this.getAttribute('data-filter');
            
            // Mettre à jour les options actives
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Appliquer le filtre
            filterOffersByStatus(filter);
        });
    });
    
    // Dropdown de filtres
    const filterDropdown = document.querySelector('.dropdown-toggle');
    if (filterDropdown) {
        filterDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.nextElementSibling;
            menu.classList.toggle('show');
        });
    }
    
    // Fermer le dropdown en cliquant à l'extérieur
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });
}

/**
 * Recherche d'offres
 */
function searchOffers(searchTerm) {
    const rows = document.querySelectorAll('.offer-row');
    const term = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const isVisible = rowText.includes(term);
        row.style.display = isVisible ? '' : 'none';
        
        // Highlight des termes recherchés
        if (isVisible && term) {
            highlightSearchTerms(row, term);
        }
    });
}

/**
 * Surligner les termes de recherche
 */
function highlightSearchTerms(row, term) {
    const cells = row.querySelectorAll('td');
    
    cells.forEach(cell => {
        const originalHTML = cell.innerHTML;
        const regex = new RegExp(`(${term})`, 'gi');
        const highlighted = originalHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
        
        if (highlighted !== originalHTML) {
            cell.innerHTML = highlighted;
        }
    });
}

/**
 * Filtrer les offres par statut
 */
function filterOffersByStatus(status) {
    const rows = document.querySelectorAll('.offer-row');
    
    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
            return;
        }
        
        const rowStatus = row.dataset.status;
        row.style.display = rowStatus === status ? '' : 'none';
    });
    
    // Mettre à jour le compteur
    updateOfferCount();
}

/**
 * Mettre à jour le compteur d'offres
 */
function updateOfferCount() {
    const visibleRows = document.querySelectorAll('.offer-row[style*="display: none"]');
    const totalRows = document.querySelectorAll('.offer-row').length;
    const visibleCount = totalRows - visibleRows.length;
    
    const countElement = document.querySelector('.section-header h2');
    if (countElement) {
        countElement.innerHTML = `<i class="fas fa-briefcase"></i> Offres disponibles (${visibleCount})`;
    }
}

/**
 * Actions sur les offres
 */
function initOfferActions() {
    // Duplication d'offre
    document.querySelectorAll('.duplicate-offer').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            duplicateOffer(this.dataset.id);
        });
    });
    
    // Fermeture d'offre
    document.querySelectorAll('.close-offer').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeOffer(this.dataset.id);
        });
    });
    
    // Publication de brouillon
    document.querySelectorAll('.publish-offer').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            publishOffer(this.dataset.id);
        });
    });
    
    // Menu "Plus d'actions"
    initMoreActionsMenu();
}

/**
 * Dupliquer une offre
 */
function duplicateOffer(offerId) {
    const row = document.querySelector(`[data-id="${offerId}"]`)?.closest('tr');
    if (!row) return;
    
    const offerTitle = row.querySelector('.offer-title-cell strong').textContent;
    
    if (!confirm(`Dupliquer l'offre "${offerTitle}" ?`)) return;
    
    // Simulation AJAX
    showLoadingState(row, 'Duplication en cours...');
    
    setTimeout(() => {
        // Créer une nouvelle ligne
        const newRow = createDuplicateRow(row);
        const tbody = row.closest('tbody');
        tbody.insertBefore(newRow, row.nextSibling);
        
        // Animation
        animateNewRow(newRow);
        
        showToast('Offre dupliquée avec succès', 'success');
        removeLoadingState(row);
        
        // Fermer le menu
        const menu = row.querySelector('.more-actions');
        if (menu) menu.classList.remove('show');
    }, 1500);
}

/**
 * Créer une ligne dupliquée
 */
function createDuplicateRow(originalRow) {
    const newRow = originalRow.cloneNode(true);
    
    // Mettre à jour les données
    newRow.dataset.status = 'draft';
    newRow.querySelector('.offer-ref').textContent = generateNewReference();
    newRow.querySelector('.offer-title-cell strong').textContent += ' (Copie)';
    newRow.querySelector('.offer-title-cell span').textContent = 'Dupliqué le ' + new Date().toLocaleDateString('fr-FR');
    newRow.querySelector('.deadline-date').textContent = 'Non définie';
    newRow.querySelector('.deadline-days').textContent = '—';
    newRow.querySelector('.applications-cell strong').textContent = '0';
    newRow.querySelector('.applications-cell span').className = 'trend-neutral';
    newRow.querySelector('.applications-cell span').textContent = '—';
    
    // Mettre à jour le statut
    const statusBadge = newRow.querySelector('.status-badge');
    statusBadge.className = 'status-badge status-draft';
    statusBadge.innerHTML = '<i class="fas fa-pen"></i> Brouillon';
    
    // Mettre à jour les boutons
    const actionButtons = newRow.querySelector('.action-buttons');
    actionButtons.innerHTML = `
        <a href="#" class="btn-action" title="Modifier">
            <i class="fas fa-edit"></i>
        </a>
        <button class="btn-action publish-offer" title="Publier">
            <i class="fas fa-paper-plane"></i>
        </button>
        <button class="btn-action btn-more" title="Plus d'actions">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="more-actions">
            <a href="#" class="action-item duplicate-offer">
                <i class="fas fa-copy"></i> Dupliquer
            </a>
            <a href="#" class="action-item text-danger delete-offer">
                <i class="fas fa-trash"></i> Supprimer
            </a>
        </div>
    `;
    
    // Réattacher les événements
    setTimeout(() => {
        initRowActions(newRow);
    }, 100);
    
    return newRow;
}

/**
 * Générer une nouvelle référence
 */
function generateNewReference() {
    const prefix = 'INSTI';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const deptCodes = ['GE', 'INF', 'GM', 'CIV', 'MATH'];
    const randomDept = deptCodes[Math.floor(Math.random() * deptCodes.length)];
    
    return `${prefix}-${year}-${randomDept}-${randomNum}`;
}

/**
 * Fermer une offre
 */
function closeOffer(offerId) {
    const row = document.querySelector(`[data-id="${offerId}"]`)?.closest('tr');
    if (!row) return;
    
    const offerTitle = row.querySelector('.offer-title-cell strong').textContent;
    
    if (!confirm(`Fermer l'offre "${offerTitle}" ? Les nouvelles candidatures ne seront plus acceptées.`)) return;
    
    // Simulation AJAX
    showLoadingState(row, 'Fermeture en cours...');
    
    setTimeout(() => {
        // Mettre à jour le statut
        row.dataset.status = 'closed';
        const statusBadge = row.querySelector('.status-badge');
        statusBadge.className = 'status-badge status-closed';
        statusBadge.innerHTML = '<i class="fas fa-lock"></i> Close';
        
        // Mettre à jour la date limite
        const deadlineCell = row.querySelector('.deadline-cell');
        deadlineCell.innerHTML = `
            <span class="deadline-date expired">${new Date().toLocaleDateString('fr-FR')}</span>
            <span class="deadline-days">Fermée</span>
        `;
        
        showToast('Offre fermée avec succès', 'warning');
        removeLoadingState(row);
        
        // Fermer le menu
        const menu = row.querySelector('.more-actions');
        if (menu) menu.classList.remove('show');
    }, 1000);
}

/**
 * Publier un brouillon
 */
function publishOffer(offerId) {
    const row = document.querySelector(`[data-id="${offerId}"]`)?.closest('tr');
    if (!row) return;
    
    const offerTitle = row.querySelector('.offer-title-cell strong').textContent;
    
    if (!confirm(`Publier l'offre "${offerTitle}" ? Elle sera visible par les candidats.`)) return;
    
    // Simulation AJAX
    showLoadingState(row, 'Publication en cours...');
    
    setTimeout(() => {
        // Mettre à jour le statut
        row.dataset.status = 'active';
        const statusBadge = row.querySelector('.status-badge');
        statusBadge.className = 'status-badge status-active';
        statusBadge.innerHTML = '<i class="fas fa-circle"></i> Active';
        
        // Mettre à jour la date limite (dans 30 jours)
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 30);
        const deadlineCell = row.querySelector('.deadline-cell');
        deadlineCell.innerHTML = `
            <span class="deadline-date">${deadline.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span class="deadline-days">30 jours restants</span>
        `;
        
        // Mettre à jour les boutons
        const publishBtn = row.querySelector('.publish-offer');
        if (publishBtn) {
            publishBtn.outerHTML = `
                <a href="#" class="btn-action" title="Voir" target="_blank">
                    <i class="fas fa-eye"></i>
                </a>
            `;
        }
        
        showToast('Offre publiée avec succès', 'success');
        removeLoadingState(row);
    }, 1500);
}

/**
 * Menu "Plus d'actions"
 */
function initMoreActionsMenu() {
    document.querySelectorAll('.btn-more').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const menu = this.nextElementSibling;
            if (!menu) return;
            
            // Fermer les autres menus
            document.querySelectorAll('.more-actions.show').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
            
            // Basculer le menu actuel
            menu.classList.toggle('show');
        });
    });
    
    // Fermer les menus en cliquant à l'extérieur
    document.addEventListener('click', () => {
        document.querySelectorAll('.more-actions.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });
    
    // Empêcher la fermeture en cliquant dans le menu
    document.querySelectorAll('.more-actions').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

/**
 * Initialiser les actions d'une ligne
 */
function initRowActions(row) {
    // Duplication
    const duplicateBtn = row.querySelector('.duplicate-offer');
    if (duplicateBtn) {
        duplicateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            duplicateOffer(this.closest('tr').querySelector('[data-id]')?.dataset.id);
        });
    }
    
    // Suppression
    const deleteBtn = row.querySelector('.delete-offer');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            deleteOffer(this.closest('tr').querySelector('[data-id]')?.dataset.id);
        });
    }
    
    // Publication
    const publishBtn = row.querySelector('.publish-offer');
    if (publishBtn) {
        publishBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            publishOffer(this.closest('tr').querySelector('[data-id]')?.dataset.id);
        });
    }
    
    // Menu plus d'actions
    const moreBtn = row.querySelector('.btn-more');
    if (moreBtn) {
        moreBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.nextElementSibling;
            menu?.classList.toggle('show');
        });
    }
}

/**
 * Supprimer une offre
 */
function deleteOffer(offerId) {
    const row = document.querySelector(`[data-id="${offerId}"]`)?.closest('tr');
    if (!row) return;
    
    const offerTitle = row.querySelector('.offer-title-cell strong').textContent;
    
    if (!confirm(`Supprimer définitivement l'offre "${offerTitle}" ? Cette action est irréversible.`)) return;
    
    // Animation de suppression
    row.style.transform = 'translateX(100%)';
    row.style.opacity = '0';
    
    setTimeout(() => {
        row.remove();
        showToast('Offre supprimée', 'danger');
        updateOfferCount();
    }, 300);
}

/**
 * État de chargement
 */
function showLoadingState(row, message = 'Chargement...') {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <span>${message}</span>
    `;
    
    row.style.position = 'relative';
    row.appendChild(loadingOverlay);
    row.style.opacity = '0.7';
}

/**
 * Supprimer l'état de chargement
 */
function removeLoadingState(row) {
    const loadingOverlay = row.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
    row.style.opacity = '1';
}

/**
 * Modal d'actions rapides
 */
function initQuickActionsModal() {
    const modal = document.getElementById('quickActionsModal');
    if (!modal) return;
    
    // Ouvrir la modale
    const triggerBtn = document.querySelector('[data-action="show-quick-actions"]');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
            modal.classList.add('show');
        });
    }
    
    // Fermer la modale
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Actions rapides
    modal.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            executeQuickAction(action);
            modal.classList.remove('show');
        });
    });
}

/**
 * Exécuter une action rapide
 */
function executeQuickAction(action) {
    switch(action) {
        case 'duplicate':
            // Dupliquer l'offre sélectionnée
            const selectedOffer = getSelectedOffer();
            if (selectedOffer) duplicateOffer(selectedOffer);
            break;
            
        case 'close':
            const selectedOffer2 = getSelectedOffer();
            if (selectedOffer2) closeOffer(selectedOffer2);
            break;
            
        case 'extend':
            extendOfferDeadline();
            break;
            
        case 'archive':
            archiveOffers();
            break;
            
        case 'delete':
            const selectedOffer3 = getSelectedOffer();
            if (selectedOffer3) deleteOffer(selectedOffer3);
            break;
    }
}

/**
 * Obtenir l'offre sélectionnée
 */
function getSelectedOffer() {
    // Pour la démo, on prend la première offre active
    const activeOffer = document.querySelector('.offer-row[data-status="active"]');
    return activeOffer?.querySelector('[data-id]')?.dataset.id;
}

/**
 * Prolonger la date limite
 */
function extendOfferDeadline() {
    const days = prompt('Prolonger de combien de jours ?', '30');
    if (!days || isNaN(days)) return;
    
    const selectedRows = getSelectedRows();
    selectedRows.forEach(row => {
        const deadlineCell = row.querySelector('.deadline-cell');
        if (deadlineCell) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + parseInt(days));
            
            deadlineCell.innerHTML = `
                <span class="deadline-date">${currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span class="deadline-days">${days} jours restants</span>
            `;
        }
    });
    
    showToast('Dates limites prolongées', 'success');
}

/**
 * Archiver des offres
 */
function archiveOffers() {
    const selectedRows = getSelectedRows();
    if (selectedRows.length === 0) return;
    
    if (!confirm(`Archiver ${selectedRows.length} offre(s) ?`)) return;
    
    selectedRows.forEach(row => {
        row.dataset.status = 'archived';
        row.style.opacity = '0.5';
        
        const statusBadge = row.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.className = 'status-badge status-closed';
            statusBadge.innerHTML = '<i class="fas fa-archive"></i> Archivée';
        }
    });
    
    showToast(`${selectedRows.length} offre(s) archivée(s)`, 'info');
}

/**
 * Obtenir les lignes sélectionnées
 */
function getSelectedRows() {
    // Pour la démo, on retourne toutes les offres actives
    return Array.from(document.querySelectorAll('.offer-row[data-status="active"]'));
}

/**
 * Fonctionnalité d'export
 */
function initExportFunctionality() {
    const exportBtn = document.getElementById('exportOffers');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', function() {
        exportOffersData();
    });
}

/**
 * Exporter les données des offres
 */
function exportOffersData() {
    const format = prompt('Format d\'export :\n1. CSV\n2. Excel\n3. PDF\n\nEntrez le numéro :');
    
    if (!format) return;
    
    const exportBtn = document.getElementById('exportOffers');
    const originalText = exportBtn.innerHTML;
    
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Export...';
    exportBtn.disabled = true;
    
    setTimeout(() => {
        let formatName;
        switch(format) {
            case '1': formatName = 'CSV'; break;
            case '2': formatName = 'Excel'; break;
            case '3': formatName = 'PDF'; break;
            default: formatName = 'CSV';
        }
        
        showToast(`Export ${formatName} terminé`, 'success');
        
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
    }, 2000);
}

/**
 * Compte à rebours des dates limites
 */
function initDeadlineCountdowns() {
    updateAllDeadlineCountdowns();
    
    // Mettre à jour toutes les heures
    setInterval(updateAllDeadlineCountdowns, 3600000);
}

/**
 * Mettre à jour tous les compte à rebours
 */
function updateAllDeadlineCountdowns() {
    document.querySelectorAll('.deadline-cell').forEach(cell => {
        const dateText = cell.querySelector('.deadline-date').textContent;
        const daysElement = cell.querySelector('.deadline-days');
        
        if (!daysElement || dateText.includes('Non définie') || dateText.includes('Expirée')) {
            return;
        }
        
        const deadlineDate = parseOfferDate(dateText);
        const now = new Date();
        const diffTime = deadlineDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            cell.querySelector('.deadline-date').classList.add('expired');
            daysElement.textContent = 'Expirée';
        } else if (diffDays === 0) {
            daysElement.textContent = 'Aujourd\'hui';
            daysElement.style.color = '#ef4444';
            daysElement.style.fontWeight = 'bold';
        } else if (diffDays <= 7) {
            daysElement.textContent = `${diffDays} jours restants`;
            daysElement.style.color = '#f59e0b';
        } else {
            daysElement.textContent = `${diffDays} jours restants`;
            daysElement.style.color = '';
        }
    });
}

/**
 * Statistiques des offres
 */
function initOfferStatistics() {
    updateOfferStats();
    
    // Mettre à jour périodiquement
    setInterval(updateOfferStats, 30000);
}

/**
 * Mettre à jour les statistiques
 */
function updateOfferStats() {
    const stats = {
        active: document.querySelectorAll('.offer-row[data-status="active"]').length,
        closed: document.querySelectorAll('.offer-row[data-status="closed"]').length,
        draft: document.querySelectorAll('.offer-row[data-status="draft"]').length,
        total: document.querySelectorAll('.offer-row').length
    };
    
    // Mettre à jour les cartes de statistiques
    updateStatCard('.stats-grid .stat-card:nth-child(1) h3', stats.active);
    updateStatCard('.stats-grid .stat-card:nth-child(2) h3', getTotalApplications());
    
    // Calculer les offres qui expirent cette semaine
    const expiringThisWeek = calculateExpiringOffers();
    updateStatCard('.stats-grid .stat-card:nth-child(3) h3', expiringThisWeek);
}

/**
 * Obtenir le total des candidatures
 */
function getTotalApplications() {
    let total = 0;
    document.querySelectorAll('.applications-cell strong').forEach(el => {
        total += parseInt(el.textContent) || 0;
    });
    return total;
}

/**
 * Calculer les offres qui expirent cette semaine
 */
function calculateExpiringOffers() {
    let count = 0;
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    document.querySelectorAll('.deadline-date:not(.expired)').forEach(dateEl => {
        const dateText = dateEl.textContent;
        if (dateText.includes('Non définie')) return;
        
        const deadlineDate = parseOfferDate(dateText);
        if (deadlineDate >= now && deadlineDate <= nextWeek) {
            count++;
        }
    });
    
    return count;
}

/**
 * Mettre à jour une carte de statistique
 */
function updateStatCard(selector, newValue) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent.replace(/\D/g, '')) || 0;
    if (currentValue !== newValue) {
        animateCounter(element, currentValue, newValue);
    }
}

/**
 * Animation de compteur
 */
function animateCounter(element, start, end) {
    const duration = 1000;
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easeOutCubic);
        
        element.textContent = currentValue.toLocaleString('fr-FR');
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

/**
 * Animation des lignes du tableau
 */
function animateTableRows() {
    const rows = document.querySelectorAll('.offer-row');
    
    rows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.05}s`;
        row.classList.add('animate-in');
    });
}

/**
 * Tooltips pour les statuts
 */
function initOfferStatusTooltips() {
    const statusBadges = document.querySelectorAll('.status-badge');
    
    statusBadges.forEach(badge => {
        const status = badge.textContent.toLowerCase().trim();
        let tooltipText = '';
        
        switch(true) {
            case status.includes('active'):
                tooltipText = 'Offre active - Accepte de nouvelles candidatures';
                break;
            case status.includes('brouillon'):
                tooltipText = 'Brouillon - Non visible par les candidats';
                break;
            case status.includes('close'):
                tooltipText = 'Offre close - Ne plus accepte de candidatures';
                break;
        }
        
        if (tooltipText) {
            badge.setAttribute('data-tooltip', tooltipText);
        }
    });
}

/**
 * Pagination des offres
 */
function initOfferPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(.disabled)');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            // Animation de transition
            const tableBody = document.querySelector('.offers-table tbody');
            tableBody.style.opacity = '0.5';
            tableBody.style.transform = 'translateY(20px)';
            
            // Mettre à jour les boutons actifs
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Simulation de chargement
            setTimeout(() => {
                tableBody.style.opacity = '1';
                tableBody.style.transform = 'translateY(0)';
                showToast('Page chargée', 'info');
            }, 500);
        });
    });
}

/**
 * Animation d'une nouvelle ligne
 */
function animateNewRow(row) {
    row.style.opacity = '0';
    row.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        row.style.transition = 'opacity 0.3s, transform 0.3s';
        row.style.opacity = '1';
        row.style.transform = 'scale(1)';
    }, 10);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Afficher une notification
 */
function showToast(message, type = 'info') {
    // Utiliser la fonction globale si disponible
    if (window.showToast) {
        window.showToast(message, type);
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
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

/**
 * Styles CSS pour la gestion des offres
 */
const offerManagementStyles = `
    @keyframes slideInRow {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .offer-row.animate-in {
        animation: slideInRow 0.5s ease forwards;
        opacity: 0;
    }
    
    .search-highlight {
        background-color: #ffeb3b;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
    
    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border-radius: 4px;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #0a3f8f;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .more-actions {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        min-width: 160px;
        z-index: 1000;
        display: none;
        margin-top: 8px;
    }
    
    .more-actions.show {
        display: block;
    }
    
    .more-actions .action-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        color: #475569;
        text-decoration: none;
        font-size: 14px;
        transition: background 0.3s;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
    }
    
    .more-actions .action-item:hover {
        background: #f8fafc;
    }
    
    .more-actions .action-item.text-danger {
        color: #ef4444;
    }
    
    .quick-actions-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        padding: 20px;
    }
    
    .quick-action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 20px;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .quick-action-btn:hover {
        background: #e2e8f0;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .quick-action-btn i {
        font-size: 24px;
        color: #475569;
    }
    
    .quick-action-btn span {
        font-size: 12px;
        font-weight: 600;
        color: #475569;
    }
    
    .quick-action-btn.text-danger i,
    .quick-action-btn.text-danger span {
        color: #ef4444;
    }
    
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        color: #1e293b;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .toast-success {
        border-left: 4px solid #10b981;
    }
    
    .toast-warning {
        border-left: 4px solid #f59e0b;
    }
    
    .toast-danger {
        border-left: 4px solid #ef4444;
    }
    
    .toast-info {
        border-left: 4px solid #3b82f6;
    }
    
    th[data-sortable]:hover {
        background: #f1f5f9;
    }
    
    th.sorted-asc, th.sorted-desc {
        background: #e0f2fe;
    }
    
    .sort-icon {
        margin-left: 5px;
        color: #0a3f8f;
    }
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = offerManagementStyles;
document.head.appendChild(styleSheet);
