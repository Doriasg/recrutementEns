/**
 * INSTI - Gestion des Utilisateurs Admin
 * Gestion des utilisateurs avec table interactive
 */

document.addEventListener('DOMContentLoaded', function() {
    initUserTable();
    initSearchAndFilters();
    initBulkActions();
    initUserActions();
    initExportFunctionality();
    initDeleteModal();
});

/**
 * Initialisation de la table des utilisateurs
 */
function initUserTable() {
    const table = document.querySelector('.users-table');
    if (!table) return;
    
    // Tri des colonnes
    initTableSorting(table);
    
    // Sélection multiple
    initRowSelection();
    
    // Infobulles pour les statuts
    initStatusTooltips();
    
    // Pagination
    initPagination();
}

/**
 * Tri de la table
 */
function initTableSorting(table) {
    const headers = table.querySelectorAll('th[data-sortable]');
    
    headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const columnIndex = Array.from(this.parentNode.children).indexOf(this);
            const sortDirection = this.classList.contains('sorted-asc') ? 'desc' : 'asc';
            
            // Réinitialiser les autres tris
            headers.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                h.querySelector('.sort-icon')?.remove();
            });
            
            // Mettre à jour l'en-tête actuel
            this.classList.add(`sorted-${sortDirection}`);
            
            const sortIcon = document.createElement('i');
            sortIcon.className = `fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} sort-icon`;
            sortIcon.style.marginLeft = '5px';
            this.appendChild(sortIcon);
            
            // Trier les lignes
            sortTableRows(table, columnIndex, sortDirection);
        });
    });
}

/**
 * Trier les lignes de la table
 */
function sortTableRows(table, columnIndex, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();
        
        // Conversion pour les dates
        let valueA, valueB;
        
        if (columnIndex === 6 || columnIndex === 7) { // Colonnes de date
            valueA = parseDate(cellA);
            valueB = parseDate(cellB);
        } else if (columnIndex === 5) { // Colonne statut
            valueA = getStatusValue(cellA);
            valueB = getStatusValue(cellB);
        } else if (columnIndex === 4) { // Colonne téléphone
            valueA = cellA.replace(/\D/g, '');
            valueB = cellB.replace(/\D/g, '');
        } else {
            valueA = cellA.toLowerCase();
            valueB = cellB.toLowerCase();
        }
        
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Réorganiser les lignes
    rows.forEach(row => tbody.appendChild(row));
    
    // Animation de tri
    animateSort(table);
}

/**
 * Parser une date
 */
function parseDate(dateString) {
    if (dateString.toLowerCase().includes('aujourd\'hui')) return new Date();
    if (dateString.toLowerCase().includes('hier')) {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date;
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
 * Obtenir la valeur d'un statut pour le tri
 */
function getStatusValue(statusText) {
    const statusMap = {
        'actif': 1,
        'en attente': 2,
        'inactif': 3,
        'suspendu': 4
    };
    
    const key = statusText.toLowerCase();
    return statusMap[key] || 0;
}

/**
 * Animation de tri
 */
function animateSort(table) {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach((row, index) => {
        row.style.opacity = '0.5';
        row.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

/**
 * Sélection de lignes
 */
function initRowSelection() {
    const selectAll = document.getElementById('selectAllUsers');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
                updateRowSelection(checkbox.closest('tr'), checkbox.checked);
            });
            
            updateBulkActionButtons();
        });
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const row = this.closest('tr');
            updateRowSelection(row, this.checked);
            
            // Mettre à jour "Sélectionner tout"
            if (selectAll) {
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);
                const someChecked = Array.from(checkboxes).some(cb => cb.checked);
                
                selectAll.checked = allChecked;
                selectAll.indeterminate = someChecked && !allChecked;
            }
            
            updateBulkActionButtons();
        });
    });
}

/**
 * Mise à jour de l'apparence de la ligne sélectionnée
 */
function updateRowSelection(row, isSelected) {
    if (isSelected) {
        row.classList.add('selected');
    } else {
        row.classList.remove('selected');
    }
}

/**
 * Recherche et filtres
 */
function initSearchAndFilters() {
    // Recherche en temps réel
    const searchInput = document.getElementById('userSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            searchUsers(this.value);
        }, 300));
    }
    
    // Filtres
    const filters = ['filterRole', 'filterStatus', 'filterDate', 'filterSort'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                applyFilters();
            });
        }
    });
}

/**
 * Recherche d'utilisateurs
 */
function searchUsers(searchTerm) {
    const rows = document.querySelectorAll('.users-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
    });
}

/**
 * Application des filtres
 */
function applyFilters() {
    const filters = {
        role: document.getElementById('filterRole')?.value || 'all',
        status: document.getElementById('filterStatus')?.value || 'all',
        date: document.getElementById('filterDate')?.value || 'all',
        sort: document.getElementById('filterSort')?.value || 'newest'
    };
    
    const rows = document.querySelectorAll('.users-table tbody tr');
    
    rows.forEach(row => {
        const role = row.querySelector('.role-badge').textContent.toLowerCase();
        const status = row.querySelector('.status-badge').textContent.toLowerCase();
        const dateText = row.cells[6].textContent;
        
        let show = true;
        
        // Filtre par rôle
        if (filters.role !== 'all' && !role.includes(filters.role)) {
            show = false;
        }
        
        // Filtre par statut
        if (filters.status !== 'all') {
            const statusMap = {
                'active': ['actif'],
                'inactive': ['inactif'],
                'pending': ['en attente'],
                'suspended': ['suspendu']
            };
            
            if (!statusMap[filters.status]?.some(s => status.includes(s))) {
                show = false;
            }
        }
        
        // Filtre par date
        if (filters.date !== 'all') {
            const rowDate = parseDate(dateText);
            const now = new Date();
            const diffTime = now - rowDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch(filters.date) {
                case 'today':
                    if (diffDays > 1) show = false;
                    break;
                case 'week':
                    if (diffDays > 7) show = false;
                    break;
                case 'month':
                    if (diffDays > 30) show = false;
                    break;
                case 'year':
                    if (diffDays > 365) show = false;
                    break;
            }
        }
        
        row.style.display = show ? '' : 'none';
    });
    
    // Appliquer le tri
    if (filters.sort !== 'newest') {
        // Implémenter le tri selon le filtre choisi
        sortUsersBy(filters.sort);
    }
}

/**
 * Trier les utilisateurs
 */
function sortUsersBy(criteria) {
    const tbody = document.querySelector('.users-table tbody');
    const rows = Array.from(tbody.querySelectorAll('tr:not([style*="none"])'));
    
    rows.sort((a, b) => {
        switch(criteria) {
            case 'oldest':
                const dateA = parseDate(a.cells[6].textContent);
                const dateB = parseDate(b.cells[6].textContent);
                return dateA - dateB;
                
            case 'name_asc':
                const nameA = a.querySelector('.user-info strong').textContent.toLowerCase();
                const nameB = b.querySelector('.user-info strong').textContent.toLowerCase();
                return nameA.localeCompare(nameB);
                
            case 'name_desc':
                const nameC = a.querySelector('.user-info strong').textContent.toLowerCase();
                const nameD = b.querySelector('.user-info strong').textContent.toLowerCase();
                return nameD.localeCompare(nameC);
                
            case 'last_active':
                // Logique simplifiée - en production, utiliser les données réelles
                return 0;
        }
        return 0;
    });
    
    // Réorganiser les lignes
    rows.forEach(row => tbody.appendChild(row));
}

/**
 * Actions groupées
 */
function initBulkActions() {
    const bulkBtn = document.getElementById('bulkActions');
    if (!bulkBtn) return;
    
    bulkBtn.addEventListener('click', function() {
        const selectedRows = getSelectedRows();
        
        if (selectedRows.length === 0) {
            showToast('Veuillez sélectionner au moins un utilisateur', 'warning');
            return;
        }
        
        showBulkActionsMenu(selectedRows);
    });
}

/**
 * Obtenir les lignes sélectionnées
 */
function getSelectedRows() {
    return Array.from(document.querySelectorAll('.user-checkbox:checked'))
        .map(checkbox => checkbox.closest('tr'));
}

/**
 * Afficher le menu des actions groupées
 */
function showBulkActionsMenu(selectedRows) {
    const menu = document.createElement('div');
    menu.className = 'bulk-actions-menu';
    menu.innerHTML = `
        <div class="menu-header">
            <h4>Actions groupées (${selectedRows.length} utilisateurs)</h4>
            <button class="close-menu">&times;</button>
        </div>
        <div class="menu-actions">
            <button class="action-btn" data-action="activate">
                <i class="fas fa-check-circle"></i>
                <span>Activer</span>
            </button>
            <button class="action-btn" data-action="deactivate">
                <i class="fas fa-times-circle"></i>
                <span>Désactiver</span>
            </button>
            <button class="action-btn" data-action="delete">
                <i class="fas fa-trash"></i>
                <span>Supprimer</span>
            </button>
            <button class="action-btn" data-action="change-role">
                <i class="fas fa-user-tag"></i>
                <span>Changer de rôle</span>
            </button>
            <button class="action-btn" data-action="export-selected">
                <i class="fas fa-download"></i>
                <span>Exporter la sélection</span>
            </button>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // Positionnement
    const bulkBtn = document.getElementById('bulkActions');
    const rect = bulkBtn.getBoundingClientRect();
    menu.style.left = `${rect.right - menu.offsetWidth}px`;
    menu.style.top = `${rect.bottom + 10}px`;
    
    // Animation d'entrée
    setTimeout(() => {
        menu.classList.add('show');
    }, 10);
    
    // Fermer le menu
    menu.querySelector('.close-menu').addEventListener('click', () => {
        menu.classList.remove('show');
        setTimeout(() => menu.remove(), 300);
    });
    
    // Actions
    menu.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            executeBulkAction(action, selectedRows);
            menu.classList.remove('show');
            setTimeout(() => menu.remove(), 300);
        });
    });
    
    // Fermer en cliquant à l'extérieur
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== bulkBtn) {
                menu.classList.remove('show');
                setTimeout(() => {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }, 300);
            }
        });
    }, 100);
}

/**
 * Exécuter une action groupée
 */
function executeBulkAction(action, rows) {
    const userIds = rows.map(row => row.querySelector('.user-checkbox').dataset.id);
    
    switch(action) {
        case 'activate':
            activateUsers(userIds);
            break;
        case 'deactivate':
            deactivateUsers(userIds);
            break;
        case 'delete':
            deleteUsers(userIds, rows);
            break;
        case 'change-role':
            changeUserRoles(userIds);
            break;
        case 'export-selected':
            exportSelectedUsers(userIds);
            break;
    }
}

/**
 * Activer des utilisateurs
 */
function activateUsers(userIds) {
    if (!confirm(`Activer ${userIds.length} utilisateur(s) ?`)) return;
    
    // Simulation AJAX
    userIds.forEach(userId => {
        const row = document.querySelector(`.user-checkbox[data-id="${userId}"]`)?.closest('tr');
        if (row) {
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.className = 'status-badge status-active';
            statusBadge.innerHTML = '<i class="fas fa-circle"></i> Actif';
        }
    });
    
    showToast(`${userIds.length} utilisateur(s) activé(s)`, 'success');
}

/**
 * Désactiver des utilisateurs
 */
function deactivateUsers(userIds) {
    if (!confirm(`Désactiver ${userIds.length} utilisateur(s) ?`)) return;
    
    userIds.forEach(userId => {
        const row = document.querySelector(`.user-checkbox[data-id="${userId}"]`)?.closest('tr');
        if (row) {
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.className = 'status-badge status-inactive';
            statusBadge.innerHTML = '<i class="fas fa-circle"></i> Inactif';
        }
    });
    
    showToast(`${userIds.length} utilisateur(s) désactivé(s)`, 'warning');
}

/**
 * Supprimer des utilisateurs
 */
function deleteUsers(userIds, rows) {
    if (!confirm(`Supprimer ${userIds.length} utilisateur(s) ? Cette action est irréversible.`)) return;
    
    rows.forEach(row => {
        row.style.opacity = '0.5';
        row.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            row.remove();
        }, 300);
    });
    
    showToast(`${userIds.length} utilisateur(s) supprimé(s)`, 'danger');
}

/**
 * Changer les rôles
 */
function changeUserRoles(userIds) {
    const roleOptions = `
        <option value="candidate">Candidat</option>
        <option value="examiner">Examinateur</option>
        <option value="admin">Administrateur</option>
        <option value="superadmin">Super Admin</option>
    `;
    
    const newRole = prompt(`Nouveau rôle pour ${userIds.length} utilisateur(s) :\n\n${roleOptions}`);
    if (!newRole) return;
    
    // Simulation
    showToast(`Rôle changé pour ${userIds.length} utilisateur(s)`, 'info');
}

/**
 * Export des utilisateurs sélectionnés
 */
function exportSelectedUsers(userIds) {
    // Simulation d'export
    const csvContent = generateUserCSV(userIds);
    downloadCSV(csvContent, `utilisateurs-${new Date().toISOString().split('T')[0]}.csv`);
    showToast('Export terminé', 'success');
}

/**
 * Générer un CSV des utilisateurs
 */
function generateUserCSV(userIds) {
    const headers = ['ID', 'Nom', 'Email', 'Rôle', 'Statut', 'Date d\'inscription'];
    const rows = userIds.map(userId => {
        const row = document.querySelector(`.user-checkbox[data-id="${userId}"]`)?.closest('tr');
        if (!row) return [];
        
        return [
            row.querySelector('.user-info span').textContent.replace('ID: ', ''),
            row.querySelector('.user-info strong').textContent,
            row.cells[3].textContent,
            row.querySelector('.role-badge').textContent,
            row.querySelector('.status-badge').textContent,
            row.cells[6].textContent
        ];
    }).filter(row => row.length > 0);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

/**
 * Télécharger un fichier CSV
 */
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/**
 * Mettre à jour les boutons d'actions groupées
 */
function updateBulkActionButtons() {
    const selectedCount = document.querySelectorAll('.user-checkbox:checked').length;
    const bulkBtn = document.getElementById('bulkActions');
    
    if (bulkBtn) {
        bulkBtn.disabled = selectedCount === 0;
        bulkBtn.title = selectedCount > 0 ? 
            `${selectedCount} utilisateur(s) sélectionné(s)` : 
            'Sélectionnez des utilisateurs';
    }
}

/**
 * Actions individuelles sur les utilisateurs
 */
function initUserActions() {
    // Approuver utilisateur
    document.querySelectorAll('.approve-user').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const userId = this.dataset.id;
            const row = this.closest('tr');
            
            if (approveUser(userId, row)) {
                this.remove();
            }
        });
    });
    
    // Activer utilisateur
    document.querySelectorAll('.activate-user').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const userId = this.dataset.id;
            const row = this.closest('tr');
            
            if (activateUser(userId, row)) {
                this.remove();
            }
        });
    });
    
    // Dropdown actions
    document.querySelectorAll('.action-btn:not(.delete-user)').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const action = this.getAttribute('title') || this.textContent.trim();
            console.log(`Action: ${action}`);
        });
    });
}

/**
 * Approuver un utilisateur
 */
function approveUser(userId, row) {
    if (!confirm('Approuver cet utilisateur ?')) return false;
    
    const statusBadge = row.querySelector('.status-badge');
    statusBadge.className = 'status-badge status-active';
    statusBadge.innerHTML = '<i class="fas fa-circle"></i> Actif';
    
    showToast('Utilisateur approuvé', 'success');
    return true;
}

/**
 * Activer un utilisateur
 */
function activateUser(userId, row) {
    if (!confirm('Activer cet utilisateur ?')) return false;
    
    const statusBadge = row.querySelector('.status-badge');
    statusBadge.className = 'status-badge status-active';
    statusBadge.innerHTML = '<i class="fas fa-circle"></i> Actif';
    
    showToast('Utilisateur activé', 'success');
    return true;
}

/**
 * Fonctionnalité d'export
 */
function initExportFunctionality() {
    const exportBtn = document.getElementById('exportUsers');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', function() {
        showExportOptions();
    });
}

/**
 * Afficher les options d'export
 */
function showExportOptions() {
    const modal = document.createElement('div');
    modal.className = 'export-modal modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Exporter les utilisateurs</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="export-options">
                    <label>
                        <input type="radio" name="exportType" value="all" checked>
                        <span>Tous les utilisateurs</span>
                    </label>
                    <label>
                        <input type="radio" name="exportType" value="filtered">
                        <span>Utilisateurs filtrés</span>
                    </label>
                    <label>
                        <input type="radio" name="exportType" value="selected">
                        <span>Utilisateurs sélectionnés</span>
                    </label>
                </div>
                <div class="format-options">
                    <label>Format :</label>
                    <select id="exportFormat">
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                        <option value="pdf">PDF</option>
                    </select>
                </div>
                <div class="field-options">
                    <label>Champs à inclure :</label>
                    <div class="checkbox-grid">
                        <label><input type="checkbox" name="fields" value="id" checked> ID</label>
                        <label><input type="checkbox" name="fields" value="name" checked> Nom</label>
                        <label><input type="checkbox" name="fields" value="email" checked> Email</label>
                        <label><input type="checkbox" name="fields" value="phone" checked> Téléphone</label>
                        <label><input type="checkbox" name="fields" value="role" checked> Rôle</label>
                        <label><input type="checkbox" name="fields" value="status" checked> Statut</label>
                        <label><input type="checkbox" name="fields" value="registration" checked> Date d'inscription</label>
                        <label><input type="checkbox" name="fields" value="last_activity"> Dernière activité</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="confirmExport">Exporter</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Afficher la modale
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Fermer la modale
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.modal-cancel').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    // Confirmer l'export
    modal.querySelector('#confirmExport').addEventListener('click', () => {
        const exportType = modal.querySelector('input[name="exportType"]:checked').value;
        const format = modal.querySelector('#exportFormat').value;
        const fields = Array.from(modal.querySelectorAll('input[name="fields"]:checked'))
            .map(cb => cb.value);
        
        performExport(exportType, format, fields);
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
}

/**
 * Effectuer l'export
 */
function performExport(type, format, fields) {
    // Simulation d'export
    const exportBtn = document.getElementById('exportUsers');
    const originalText = exportBtn.innerHTML;
    
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Export en cours...';
    exportBtn.disabled = true;
    
    setTimeout(() => {
        exportBtn.innerHTML = '<i class="fas fa-check"></i> Export terminé';
        
        setTimeout(() => {
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }, 2000);
        
        showToast('Fichier exporté avec succès', 'success');
    }, 2000);
}

/**
 * Initialisation de la modale de suppression
 */
function initDeleteModal() {
    // La logique de suppression est gérée dans votre app.js global
    // Cette fonction peut être utilisée pour des personnalisations spécifiques
    
    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const row = this.closest('tr');
            const userName = row.querySelector('.user-info strong').textContent;
            const userEmail = row.cells[3].textContent;
            const userId = this.dataset.id;
            
            // Utiliser la fonction globale de votre app.js
            if (window.showDeleteModal) {
                window.showDeleteModal({
                    id: userId,
                    name: userName,
                    email: userEmail,
                    onConfirm: () => {
                        // Logique de suppression
                        row.style.opacity = '0.5';
                        row.style.transform = 'translateX(100px)';
                        
                        setTimeout(() => {
                            row.remove();
                            showToast('Utilisateur supprimé', 'danger');
                        }, 300);
                    }
                });
            }
        });
    });
}

/**
 * Infobulles pour les statuts
 */
function initStatusTooltips() {
    const statusBadges = document.querySelectorAll('.status-badge');
    
    statusBadges.forEach(badge => {
        const status = badge.textContent.toLowerCase().trim();
        let tooltipText = '';
        
        switch(true) {
            case status.includes('actif'):
                tooltipText = 'Utilisateur actif - Peut se connecter';
                break;
            case status.includes('inactif'):
                tooltipText = 'Utilisateur inactif - Ne peut pas se connecter';
                break;
            case status.includes('en attente'):
                tooltipText = 'En attente de validation par un administrateur';
                break;
            case status.includes('suspendu'):
                tooltipText = 'Compte suspendu temporairement';
                break;
        }
        
        if (tooltipText) {
            badge.setAttribute('data-tooltip', tooltipText);
        }
    });
}

/**
 * Pagination
 */
function initPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(.disabled)');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            // Mettre à jour les boutons actifs
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Simuler le chargement de page
            simulatePageLoad();
        });
    });
}

/**
 * Simuler le chargement d'une page
 */
function simulatePageLoad() {
    const tableBody = document.querySelector('.users-table tbody');
    if (!tableBody) return;
    
    // Animation de chargement
    tableBody.style.opacity = '0.5';
    
    setTimeout(() => {
        // En production, ce serait une requête AJAX
        tableBody.style.opacity = '1';
        showToast('Page chargée', 'info');
    }, 500);
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
 * Afficher une notification toast
 */
function showToast(message, type = 'info') {
    // Utiliser la fonction globale si disponible
    if (window.showToast) {
        window.showToast(message, type);
        return;
    }
    
    // Fallback local
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
 * Styles CSS pour les composants
 */
const userManagementStyles = `
    .bulk-actions-menu {
        position: absolute;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        min-width: 250px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s, transform 0.3s;
    }
    
    .bulk-actions-menu.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .menu-header h4 {
        margin: 0;
        font-size: 14px;
        color: #1e293b;
    }
    
    .close-menu {
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
        padding: 0;
    }
    
    .menu-actions {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .menu-actions .action-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        background: none;
        border: none;
        text-align: left;
        width: 100%;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s;
        color: #475569;
    }
    
    .menu-actions .action-btn:hover {
        background: #f8fafc;
    }
    
    .menu-actions .action-btn i {
        width: 20px;
        text-align: center;
    }
    
    .users-table tbody tr.selected {
        background: #f0f9ff !important;
        border-left: 3px solid #0a3f8f;
    }
    
    th[data-sortable]:hover {
        background: #f1f5f9;
    }
    
    th.sorted-asc, th.sorted-desc {
        background: #e0f2fe;
    }
    
    .export-modal .export-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
    }
    
    .export-modal label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
    
    .export-modal .format-options {
        margin-bottom: 20px;
    }
    
    .export-modal .field-options .checkbox-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-top: 10px;
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
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = userManagementStyles;
document.head.appendChild(styleSheet);
