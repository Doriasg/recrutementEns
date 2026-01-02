/**
 * Page Évaluations - INSTI Plateforme
 * Gestion de la page des évaluations
 */

document.addEventListener('DOMContentLoaded', function() {
    initEvaluationsPage();
});

function initEvaluationsPage() {
    // Initialisation du tableau
    initEvaluationsTable();
    
    // Initialisation des filtres
    initEvaluationsFilters();
    
    // Initialisation du tri
    initEvaluationsSorting();
    
    // Initialisation des actions
    initEvaluationsActions();
    
    // Initialisation de la pagination
    initEvaluationsPagination();
    
    // Initialisation des sélections multiples
    initBulkActions();
    
    // Initialisation des statistiques
    initEvaluationsStats();
    
    // Initialisation des mises à jour en temps réel
    initEvaluationsRealTime();
}

/**
 * Initialisation du tableau
 */
function initEvaluationsTable() {
    const table = document.querySelector('.evaluations-table');
    if (!table) return;
    
    // Alternance des couleurs des lignes
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.style.backgroundColor = '#f8fafc';
        }
    });
    
    // Gestion du survol
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f1f5f9';
        });
        
        row.addEventListener('mouseleave', function() {
            const index = Array.from(rows).indexOf(this);
            this.style.backgroundColor = index % 2 === 0 ? '#f8fafc' : '#fff';
        });
        
        // Clic sur une ligne
        row.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur un lien ou un bouton
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            const evaluationId = this.dataset.evaluationId;
            if (evaluationId) {
                viewEvaluationDetails(evaluationId);
            }
        });
    });
    
    // Initialisation des tooltips
    initTableTooltips();
}

/**
 * Initialisation des tooltips du tableau
 */
function initTableTooltips() {
    const cellsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    cellsWithTooltips.forEach(cell => {
        cell.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'table-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            this._tooltip = tooltip;
        });
        
        cell.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
}

/**
 * Initialisation des filtres
 */
function initEvaluationsFilters() {
    const filterElements = document.querySelectorAll('#filterStatus, #filterDepartment, #filterPriority, #filterDate');
    const applyBtn = document.querySelector('.btn-apply-filter');
    const resetBtn = document.querySelector('.btn-reset-filter');
    
    // Appliquer les filtres
    if (applyBtn) {
        applyBtn.addEventListener('click', applyTableFilters);
    }
    
    // Réinitialiser les filtres
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTableFilters);
    }
    
    // Appliquer automatiquement
    filterElements.forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyTableFilters);
        }
    });
    
    // Charger les filtres depuis l'URL
    loadFiltersFromURL();
}

/**
 * Appliquer les filtres du tableau
 */
function applyTableFilters() {
    const status = document.getElementById('filterStatus')?.value || 'all';
    const department = document.getElementById('filterDepartment')?.value || 'all';
    const priority = document.getElementById('filterPriority')?.value || 'all';
    const date = document.getElementById('filterDate')?.value || 'all';
    
    const rows = document.querySelectorAll('.evaluations-table tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowStatus = getRowStatus(row);
        const rowDepartment = getRowDepartment(row);
        const rowPriority = getRowPriority(row);
        const rowDate = getRowDate(row);
        const today = new Date();
        
        let show = true;
        
        // Filtre par statut
        if (status !== 'all' && status !== rowStatus) {
            show = false;
        }
        
        // Filtre par département
        if (department !== 'all' && department !== rowDepartment) {
            show = false;
        }
        
        // Filtre par priorité
        if (priority !== 'all' && priority !== rowPriority) {
            show = false;
        }
        
        // Filtre par date
        if (date !== 'all') {
            const diffTime = Math.abs(today - rowDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch(date) {
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
        
        if (show) visibleCount++;
    });
    
    // Mettre à jour le compteur
    updateTableCount(visibleCount);
    
    // Sauvegarder les filtres dans l'URL
    saveFiltersToURL({ status, department, priority, date });
}

/**
 * Obtenir le statut d'une ligne
 */
function getRowStatus(row) {
    const statusBadge = row.querySelector('.status-badge');
    if (!statusBadge) return 'unknown';
    
    if (statusBadge.classList.contains('status-pending')) return 'pending';
    if (statusBadge.classList.contains('status-in-progress')) return 'in_progress';
    if (statusBadge.classList.contains('status-completed')) return 'completed';
    
    return 'unknown';
}

/**
 * Obtenir le département d'une ligne
 */
function getRowDepartment(row) {
    const departmentCell = row.cells[3];
    if (!departmentCell) return '';
    
    const text = departmentCell.textContent.toLowerCase();
    if (text.includes('électrique')) return 'electrique';
    if (text.includes('informatique')) return 'informatique';
    if (text.includes('mécanique')) return 'mecanique';
    if (text.includes('civil')) return 'civil';
    
    return '';
}

/**
 * Obtenir la priorité d'une ligne
 */
function getRowPriority(row) {
    const priorityBadge = row.querySelector('.priority-badge');
    if (!priorityBadge) return 'normal';
    
    if (priorityBadge.classList.contains('priority-urgent')) return 'urgent';
    if (priorityBadge.classList.contains('priority-high')) return 'high';
    
    return 'normal';
}

/**
 * Obtenir la date d'une ligne
 */
function getRowDate(row) {
    const dateCell = row.cells[7];
    if (!dateCell) return new Date();
    
    const dateText = dateCell.textContent;
    return parseFrenchDate(dateText) || new Date();
}

/**
 * Mettre à jour le compteur du tableau
 */
function updateTableCount(count) {
    const countElement = document.querySelector('.evaluations-count');
    if (countElement) {
        countElement.textContent = `(${count})`;
    }
    
    // Mettre à jour l'info de pagination
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        const visibleRows = document.querySelectorAll('.evaluations-table tbody tr[style=""]');
        const start = 1;
        const end = visibleRows.length;
        const total = count;
        
        paginationInfo.innerHTML = `Affichage <strong>${start}-${end}</strong> sur <strong>${total}</strong> candidatures`;
    }
}

/**
 * Sauvegarder les filtres dans l'URL
 */
function saveFiltersToURL(filters) {
    const url = new URL(window.location);
    
    // Supprimer les anciens paramètres
    ['status', 'department', 'priority', 'date'].forEach(param => {
        url.searchParams.delete(param);
    });
    
    // Ajouter les nouveaux paramètres
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== 'all') {
            url.searchParams.set(key, value);
        }
    });
    
    window.history.replaceState({}, '', url);
}

/**
 * Charger les filtres depuis l'URL
 */
function loadFiltersFromURL() {
    const url = new URL(window.location);
    const filters = {
        status: url.searchParams.get('status') || 'all',
        department: url.searchParams.get('department') || 'all',
        priority: url.searchParams.get('priority') || 'all',
        date: url.searchParams.get('date') || 'all'
    };
    
    // Appliquer aux selects
    Object.entries(filters).forEach(([key, value]) => {
        const element = document.getElementById(`filter${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (element && value !== 'all') {
            element.value = value;
        }
    });
    
    // Appliquer les filtres
    if (Object.values(filters).some(v => v !== 'all')) {
        setTimeout(() => applyTableFilters(), 100);
    }
}

/**
 * Réinitialiser les filtres
 */
function resetTableFilters() {
    const filterElements = document.querySelectorAll('#filterStatus, #filterDepartment, #filterPriority, #filterDate');
    
    filterElements.forEach(filter => {
        if (filter) filter.value = 'all';
    });
    
    applyTableFilters();
}

/**
 * Initialisation du tri
 */
function initEvaluationsSorting() {
    const sortSelect = document.querySelector('.sort-options select');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        sortTableRows(sortBy);
    });
}

/**
 * Trier les lignes du tableau
 */
function sortTableRows(sortBy) {
    const tbody = document.querySelector('.evaluations-table tbody');
    if (!tbody) return;
    
    const rows = Array.from(tbody.querySelectorAll('tr[style=""]'));
    
    rows.sort((a, b) => {
        switch(sortBy) {
            case 'candidate':
                const nameA = a.querySelector('.candidate-info strong')?.textContent.toLowerCase() || '';
                const nameB = b.querySelector('.candidate-info strong')?.textContent.toLowerCase() || '';
                return nameA.localeCompare(nameB);
                
            case 'score':
                const scoreA = parseInt(a.querySelector('.score-badge')?.textContent || '0');
                const scoreB = parseInt(b.querySelector('.score-badge')?.textContent || '0');
                return scoreB - scoreA;
                
            case 'deadline':
                const dateA = getRowDate(a);
                const dateB = getRowDate(b);
                return dateA - dateB;
                
            case 'status':
                const statusA = getRowStatus(a);
                const statusB = getRowStatus(b);
                const statusOrder = { 'pending': 1, 'in_progress': 2, 'completed': 3 };
                return (statusOrder[statusA] || 0) - (statusOrder[statusB] || 0);
                
            default:
                return 0;
        }
    });
    
    // Réorganiser les lignes
    rows.forEach(row => tbody.appendChild(row));
}

/**
 * Initialisation des actions
 */
function initEvaluationsActions() {
    // Boutons d'action
    const actionButtons = document.querySelectorAll('.btn-action');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const action = this.classList[1].replace('btn-', '');
            const row = this.closest('tr');
            const evaluationId = row.dataset.evaluationId;
            
            if (action && evaluationId) {
                performAction(action, evaluationId, row);
            }
        });
    });
}

/**
 * Exécuter une action
 */
function performAction(action, evaluationId, row) {
    switch(action) {
        case 'evaluate':
            startEvaluation(evaluationId, row);
            break;
        case 'view':
            viewCandidateProfile(evaluationId);
            break;
        case 'download':
            downloadCandidateDocuments(evaluationId, row);
            break;
        case 'review':
            reviewEvaluation(evaluationId, row);
            break;
        case 'print':
            printEvaluationReport(evaluationId, row);
            break;
    }
}

/**
 * Démarrer une évaluation
 */
function startEvaluation(evaluationId, row) {
    const button = row.querySelector('.btn-evaluate');
    if (!button) return;
    
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulation
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.disabled = false;
        
        // Ouvrir la page d'évaluation
        window.location.href = `/examiner/evaluation/${evaluationId}`;
    }, 500);
}

/**
 * Voir le profil d'un candidat
 */
function viewCandidateProfile(evaluationId) {
    window.open(`/examiner/candidate/${evaluationId}`, '_blank');
}

/**
 * Télécharger les documents d'un candidat
 */
function downloadCandidateDocuments(evaluationId, row) {
    const candidateName = row.querySelector('.candidate-info strong')?.textContent || 'candidat';
    const button = row.querySelector('.btn-download');
    
    if (button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Simulation de téléchargement
        setTimeout(() => {
            // Créer un fichier ZIP fictif
            const zipContent = `Dossier_${candidateName.replace(/\s+/g, '_')}_${evaluationId}.zip`;
            
            const link = document.createElement('a');
            link.href = '#';
            link.download = zipContent;
            link.click();
            
            button.innerHTML = originalHTML;
            button.disabled = false;
            
            window.INSTI?.showToast(`Téléchargement de ${zipContent}`, 'success');
        }, 1000);
    }
}

/**
 * Revoir une évaluation
 */
function reviewEvaluation(evaluationId, row) {
    window.location.href = `/examiner/evaluation/${evaluationId}/review`;
}

/**
 * Imprimer un rapport d'évaluation
 */
function printEvaluationReport(evaluationId, row) {
    const candidateName = row.querySelector('.candidate-info strong')?.textContent || 'Candidat';
    const department = row.cells[3]?.textContent || 'Département';
    const score = row.querySelector('.score-badge')?.textContent || '0/100';
    
    // Ouvrir une fenêtre d'impression
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Rapport d'Évaluation - ${candidateName}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 30px; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0a3f8f; padding-bottom: 20px; }
                .header h1 { color: #0a3f8f; margin-bottom: 10px; }
                .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
                .section { margin: 30px 0; }
                .section h2 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                .criteria-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .criteria-table th, .criteria-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                .criteria-table th { background: #f8f9fa; }
                .total-score { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Rapport d'Évaluation</h1>
                <p>INSTI - Plateforme de Recrutement</p>
                <p>Date d'impression : ${new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div class="info-grid">
                <div>
                    <h3>Informations Candidat</h3>
                    <p><strong>Nom :</strong> ${candidateName}</p>
                    <p><strong>Département :</strong> ${department}</p>
                    <p><strong>ID Évaluation :</strong> ${evaluationId}</p>
                </div>
                <div>
                    <h3>Informations Évaluation</h3>
                    <p><strong>Score total :</strong> ${score}</p>
                    <p><strong>Statut :</strong> ${row.querySelector('.status-badge')?.textContent || 'Non défini'}</p>
                    <p><strong>Date d'évaluation :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Détail des Critères</h2>
                <table class="criteria-table">
                    <thead>
                        <tr>
                            <th>Critère</th>
                            <th>Score</th>
                            <th>Commentaires</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Formation académique</td>
                            <td>25/30</td>
                            <td>Doctorat dans un domaine pertinent</td>
                        </tr>
                        <tr>
                            <td>Expérience professionnelle</td>
                            <td>20/25</td>
                            <td>Expérience significative dans l'enseignement</td>
                        </tr>
                        <tr>
                            <td>Publications scientifiques</td>
                            <td>15/20</td>
                            <td>Publications dans des revues indexées</td>
                        </tr>
                        <tr>
                            <td>Compétences pédagogiques</td>
                            <td>10/15</td>
                            <td>Bonne capacité de communication</td>
                        </tr>
                        <tr>
                            <td>Projets de recherche</td>
                            <td>10/10</td>
                            <td>Encadrement de projets étudiants</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="total-score">
                    <p>Score total : ${score}</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Recommandations</h2>
                <p>Le candidat présente un profil solide avec une formation académique de qualité et une expérience professionnelle significative.</p>
                <p><strong>Recommandation :</strong> À retenir pour le poste</p>
            </div>
            
            <div class="section no-print">
                <button onclick="window.print()" style="padding: 10px 20px; background: #0a3f8f; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Imprimer ce rapport
                </button>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

/**
 * Initialisation de la pagination
 */
function initEvaluationsPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;
            
            // Mettre à jour l'état actif
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Charger la page
            const page = this.textContent.trim();
            loadPage(page);
        });
    });
}

/**
 * Charger une page
 */
function loadPage(page) {
    const tableBody = document.querySelector('.evaluations-table tbody');
    if (!tableBody) return;
    
    // Afficher le chargement
    tableBody.style.opacity = '0.5';
    
    // Simulation de chargement
    setTimeout(() => {
        tableBody.style.opacity = '1';
        
        // Mettre à jour l'URL
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        window.history.pushState({}, '', url);
        
        window.INSTI?.showToast(`Page ${page} chargée`, 'info');
    }, 500);
}

/**
 * Initialisation des sélections multiples
 */
function initBulkActions() {
    const selectAll = document.getElementById('selectAll');
    const selectRows = document.querySelectorAll('.select-row');
    const bulkBtn = document.querySelector('.btn-bulk');
    
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            selectRows.forEach(row => {
                row.checked = this.checked;
            });
            
            updateBulkButton();
        });
    }
    
    selectRows.forEach(row => {
        row.addEventListener('change', updateBulkButton);
    });
    
    if (bulkBtn) {
        bulkBtn.addEventListener('click', showBulkActionsMenu);
    }
}

/**
 * Mettre à jour le bouton d'actions groupées
 */
function updateBulkButton() {
    const selectedCount = document.querySelectorAll('.select-row:checked').length;
    const bulkBtn = document.querySelector('.btn-bulk');
    
    if (bulkBtn) {
        if (selectedCount > 0) {
            bulkBtn.disabled = false;
            bulkBtn.innerHTML = `<i class="fas fa-tasks"></i> Actions groupées (${selectedCount})`;
        } else {
            bulkBtn.disabled = true;
            bulkBtn.innerHTML = `<i class="fas fa-tasks"></i> Actions groupées`;
        }
    }
}

/**
 * Afficher le menu d'actions groupées
 */
function showBulkActionsMenu() {
    const selectedRows = document.querySelectorAll('.select-row:checked');
    if (selectedRows.length === 0) return;
    
    const menu = document.createElement('div');
    menu.className = 'bulk-actions-menu';
    menu.innerHTML = `
        <div class="menu-header">
            <h4>Actions pour ${selectedRows.length} évaluation(s)</h4>
            <button class="menu-close">&times;</button>
        </div>
        <div class="menu-items">
            <button class="menu-item" data-action="mark_completed">
                <i class="fas fa-check-circle"></i> Marquer comme terminé
            </button>
            <button class="menu-item" data-action="change_priority">
                <i class="fas fa-flag"></i> Changer de priorité
            </button>
            <button class="menu-item" data-action="assign_to">
                <i class="fas fa-user-plus"></i> Assigner à un collègue
            </button>
            <button class="menu-item" data-action="export_selected">
                <i class="fas fa-download"></i> Exporter la sélection
            </button>
            <button class="menu-item text-danger" data-action="delete_selected">
                <i class="fas fa-trash"></i> Supprimer la sélection
            </button>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // Positionner le menu
    const bulkBtn = document.querySelector('.btn-bulk');
    if (bulkBtn) {
        const rect = bulkBtn.getBoundingClientRect();
        menu.style.top = `${rect.bottom + 5}px`;
        menu.style.left = `${rect.left}px`;
    }
    
    // Fermer le menu
    const closeMenu = () => menu.remove();
    
    menu.querySelector('.menu-close').addEventListener('click', closeMenu);
    
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && e.target !== bulkBtn) {
            closeMenu();
        }
    });
    
    // Gestion des actions
    menu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            performBulkAction(action, selectedRows);
            closeMenu();
        });
    });
}

/**
 * Exécuter une action groupée
 */
function performBulkAction(action, selectedRows) {
    const evaluationIds = Array.from(selectedRows).map(row => {
        return row.closest('tr').dataset.evaluationId;
    }).filter(id => id);
    
    switch(action) {
        case 'mark_completed':
            markEvaluationsAsCompleted(evaluationIds, selectedRows);
            break;
        case 'change_priority':
            changeEvaluationsPriority(evaluationIds);
            break;
        case 'assign_to':
            assignEvaluationsToColleague(evaluationIds);
            break;
        case 'export_selected':
            exportSelectedEvaluations(evaluationIds);
            break;
        case 'delete_selected':
            deleteSelectedEvaluations(evaluationIds, selectedRows);
            break;
    }
}

/**
 * Marquer des évaluations comme terminées
 */
function markEvaluationsAsCompleted(evaluationIds, selectedRows) {
    selectedRows.forEach(row => {
        const statusBadge = row.closest('tr').querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.className = 'status-badge status-completed';
            statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> Terminée';
        }
        
        // Décocher la ligne
        row.checked = false;
    });
    
    updateBulkButton();
    window.INSTI?.showToast(`${evaluationIds.length} évaluation(s) marquée(s) comme terminée(s)`, 'success');
}

/**
 * Changer la priorité des évaluations
 */
function changeEvaluationsPriority(evaluationIds) {
    const priority = prompt('Nouvelle priorité :\n1. Urgent\n2. Haute\n3. Normale\n\nEntrez le numéro :');
    
    if (!priority) return;
    
    let priorityClass = '';
    let priorityText = '';
    
    switch(priority) {
        case '1':
            priorityClass = 'priority-urgent';
            priorityText = 'Urgent';
            break;
        case '2':
            priorityClass = 'priority-high';
            priorityText = 'Haute';
            break;
        case '3':
            priorityClass = 'priority-normal';
            priorityText = 'Normale';
            break;
        default:
            return;
    }
    
    evaluationIds.forEach(id => {
        const row = document.querySelector(`tr[data-evaluation-id="${id}"]`);
        if (row) {
            const priorityBadge = row.querySelector('.priority-badge');
            if (priorityBadge) {
                priorityBadge.className = `priority-badge ${priorityClass}`;
                priorityBadge.innerHTML = `<i class="fas fa-${priority === '1' ? 'exclamation-circle' : 'clock'}"></i> ${priorityText}`;
            }
        }
    });
    
    window.INSTI?.showToast('Priorité mise à jour', 'success');
}

/**
 * Assigner des évaluations à un collègue
 */
function assignEvaluationsToColleague(evaluationIds) {
    const colleague = prompt('Nom du collègue :');
    
    if (!colleague) return;
    
    // Simulation
    window.INSTI?.showToast(`${evaluationIds.length} évaluation(s) assignée(s) à ${colleague}`, 'success');
}

/**
 * Exporter les évaluations sélectionnées
 */
function exportSelectedEvaluations(evaluationIds) {
    // Créer un fichier CSV
    let csvContent = "ID Évaluation,Nom Candidat,Département,Score,Statut,Date Soumission\n";
    
    evaluationIds.forEach(id => {
        const row = document.querySelector(`tr[data-evaluation-id="${id}"]`);
        if (row) {
            const name = row.querySelector('.candidate-info strong')?.textContent || '';
            const department = row.cells[3]?.textContent || '';
            const score = row.querySelector('.score-badge')?.textContent || '';
            const status = row.querySelector('.status-badge')?.textContent || '';
            const date = row.cells[7]?.textContent || '';
            
            csvContent += `"${id}","${name}","${department}","${score}","${status}","${date}"\n`;
        }
    });
    
    // Télécharger
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `evaluations_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.INSTI?.showToast('Export terminé', 'success');
}

/**
 * Supprimer les évaluations sélectionnées
 */
function deleteSelectedEvaluations(evaluationIds, selectedRows) {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer ${evaluationIds.length} évaluation(s) ?`);
    
    if (!confirmDelete) return;
    
    selectedRows.forEach(row => {
        const tableRow = row.closest('tr');
        if (tableRow) {
            tableRow.remove();
        }
    });
    
    updateBulkButton();
    window.INSTI?.showToast(`${evaluationIds.length} évaluation(s) supprimée(s)`, 'success');
}

/**
 * Initialisation des statistiques
 */
function initEvaluationsStats() {
    // Mettre à jour les statistiques toutes les minutes
    setInterval(updateQuickStats, 60000);
}

/**
 * Mettre à jour les statistiques rapides
 */
function updateQuickStats() {
    const stats = {
        urgent: Math.floor(Math.random() * 3) + 3,
        avgDelay: (Math.random() * 1.5 + 2).toFixed(1),
        completion: Math.floor(Math.random() * 10) + 65,
        monthly: Math.floor(Math.random() * 10) + 25
    };
    
    // Mettre à jour l'affichage
    updateStatElement('urgentEvaluations', stats.urgent);
    updateStatElement('averageDelay', stats.avgDelay);
    updateStatElement('completionRate', stats.completion);
    updateStatElement('monthlyEvaluations', stats.monthly);
}

/**
 * Mettre à jour un élément de statistique
 */
function updateStatElement(statId, newValue) {
    const element = document.querySelector(`[data-stat="${statId}"]`);
    if (element) {
        const oldValue = element.textContent;
        if (oldValue !== newValue.toString()) {
            element.textContent = newValue;
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 1000);
        }
    }
}

/**
 * Initialisation des mises à jour en temps réel
 */
function initEvaluationsRealTime() {
    // Simuler des mises à jour périodiques
    setInterval(simulateRealTimeUpdates, 30000);
}

/**
 * Simuler des mises à jour en temps réel
 */
function simulateRealTimeUpdates() {
    // 20% de chance d'avoir une mise à jour
    if (Math.random() < 0.2) {
        const rows = document.querySelectorAll('.evaluations-table tbody tr');
        if (rows.length === 0) return;
        
        // Sélectionner une ligne au hasard
        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        
        // Mettre à jour le score
        const scoreBadge = randomRow.querySelector('.score-badge');
        if (scoreBadge) {
            const currentScore = parseInt(scoreBadge.textContent) || 0;
            const newScore = Math.min(currentScore + Math.floor(Math.random() * 5), 100);
            
            if (newScore !== currentScore) {
                scoreBadge.textContent = `${newScore}/100`;
                scoreBadge.className = `score-badge score-${newScore >= 80 ? 'high' : newScore >= 60 ? 'medium' : 'low'}`;
                scoreBadge.classList.add('updated');
                setTimeout(() => scoreBadge.classList.remove('updated'), 1000);
            }
        }
        
        // Mettre à jour le statut
        const statusBadge = randomRow.querySelector('.status-badge');
        if (statusBadge && Math.random() < 0.1) {
            if (statusBadge.classList.contains('status-pending')) {
                statusBadge.className = 'status-badge status-in-progress';
                statusBadge.innerHTML = '<i class="fas fa-play-circle"></i> En cours';
            } else if (statusBadge.classList.contains('status-in-progress')) {
                statusBadge.className = 'status-badge status-completed';
                statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> Terminée';
            }
        }
    }
}
