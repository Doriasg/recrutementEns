/**
 * Page Candidatures - INSTI Plateforme
 * Gestion des candidatures de l'enseignant
 */

document.addEventListener('DOMContentLoaded', function() {
    initApplicationsPage();
});

function initApplicationsPage() {
    // Initialisation des filtres
    initApplicationFilters();
    
    // Initialisation du tri
    initApplicationSorting();
    
    // Initialisation des cartes de candidature
    initApplicationCards();
    
    // Initialisation de la pagination
    initApplicationsPagination();
    
    // Initialisation des boutons d'action
    initApplicationActions();
    
    // Initialisation du téléchargement
    initApplicationDownloads();
    
    // Initialisation des mises à jour en temps réel
    initApplicationsRealTime();
    
    // Charger les candidatures
    loadApplications();
}

/**
 * Initialisation des filtres
 */
function initApplicationFilters() {
    const filterStatus = document.getElementById('filterStatus');
    const filterSort = document.getElementById('filterSort');
    const filterBtn = document.querySelector('.btn-filter');
    
    if (filterStatus) {
        filterStatus.addEventListener('change', filterApplications);
    }
    
    if (filterSort) {
        filterSort.addEventListener('change', sortApplications);
    }
    
    if (filterBtn) {
        filterBtn.addEventListener('click', showAdvancedFilters);
    }
}

/**
 * Filtrer les candidatures
 */
function filterApplications() {
    const status = document.getElementById('filterStatus')?.value || 'all';
    const applications = document.querySelectorAll('.job-card');
    
    applications.forEach(card => {
        const cardStatus = getCardStatus(card);
        
        if (status === 'all' || status === cardStatus) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    updateApplicationsCount();
}

/**
 * Obtenir le statut d'une carte
 */
function getCardStatus(card) {
    const badge = card.querySelector('.badge');
    if (!badge) return 'unknown';
    
    if (badge.classList.contains('green')) return 'accepted';
    if (badge.classList.contains('orange')) return 'active';
    if (badge.classList.contains('red')) return 'rejected';
    
    return 'unknown';
}

/**
 * Mettre à jour le compteur de candidatures
 */
function updateApplicationsCount() {
    const visibleCards = document.querySelectorAll('.job-card[style=""]');
    const stats = {
        total: visibleCards.length,
        active: 0,
        accepted: 0,
        rejected: 0
    };
    
    visibleCards.forEach(card => {
        const status = getCardStatus(card);
        if (status === 'active') stats.active++;
        if (status === 'accepted') stats.accepted++;
        if (status === 'rejected') stats.rejected++;
    });
    
    // Mettre à jour les statistiques
    updateStatsDisplay(stats);
}

/**
 * Mettre à jour l'affichage des statistiques
 */
function updateStatsDisplay(stats) {
    // Mettre à jour les compteurs
    document.querySelectorAll('.stat-box strong').forEach((element, index) => {
        const value = Object.values(stats)[index];
        element.textContent = value;
    });
}

/**
 * Trier les candidatures
 */
function sortApplications() {
    const sortBy = document.getElementById('filterSort')?.value || 'newest';
    const container = document.querySelector('.content');
    const cards = Array.from(container.querySelectorAll('.job-card[style=""]'));
    
    cards.sort((a, b) => {
        switch(sortBy) {
            case 'newest':
                const dateA = new Date(a.dataset.submissionDate || '');
                const dateB = new Date(b.dataset.submissionDate || '');
                return dateB - dateA;
                
            case 'oldest':
                const dateA2 = new Date(a.dataset.submissionDate || '');
                const dateB2 = new Date(b.dataset.submissionDate || '');
                return dateA2 - dateB2;
                
            case 'deadline':
                const deadlineA = new Date(a.dataset.deadline || '');
                const deadlineB = new Date(b.dataset.deadline || '');
                return deadlineA - deadlineB;
                
            default:
                return 0;
        }
    });
    
    // Réorganiser les cartes
    cards.forEach(card => container.appendChild(card));
}

/**
 * Afficher les filtres avancés
 */
function showAdvancedFilters() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Filtres avancés</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="filter-group">
                    <label>Département</label>
                    <select id="advancedDepartment">
                        <option value="">Tous</option>
                        <option value="electrique">Génie Électrique</option>
                        <option value="informatique">Informatique</option>
                        <option value="mecanique">Génie Mécanique</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Date de soumission</label>
                    <div class="date-range">
                        <input type="date" id="dateFrom" placeholder="Du">
                        <input type="date" id="dateTo" placeholder="Au">
                    </div>
                </div>
                <div class="filter-group">
                    <label>Avec documents manquants</label>
                    <input type="checkbox" id="missingDocs">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-primary" id="applyAdvancedFilters">Appliquer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestion de la fermeture
    const closeModal = () => modal.remove();
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Application des filtres avancés
    modal.querySelector('#applyAdvancedFilters').addEventListener('click', function() {
        const department = modal.querySelector('#advancedDepartment').value;
        const dateFrom = modal.querySelector('#dateFrom').value;
        const dateTo = modal.querySelector('#dateTo').value;
        const missingDocs = modal.querySelector('#missingDocs').checked;
        
        applyAdvancedFilters({ department, dateFrom, dateTo, missingDocs });
        closeModal();
    });
}

/**
 * Appliquer les filtres avancés
 */
function applyAdvancedFilters(filters) {
    const applications = document.querySelectorAll('.job-card');
    
    applications.forEach(card => {
        let show = true;
        
        // Filtre par département
        if (filters.department) {
            const cardDept = card.dataset.department || '';
            if (cardDept !== filters.department) show = false;
        }
        
        // Filtre par date
        if (filters.dateFrom || filters.dateTo) {
            const submissionDate = new Date(card.dataset.submissionDate || '');
            
            if (filters.dateFrom) {
                const fromDate = new Date(filters.dateFrom);
                if (submissionDate < fromDate) show = false;
            }
            
            if (filters.dateTo) {
                const toDate = new Date(filters.dateTo);
                if (submissionDate > toDate) show = false;
            }
        }
        
        // Filtre par documents manquants
        if (filters.missingDocs) {
            const hasMissingDocs = card.dataset.missingDocs === 'true';
            if (!hasMissingDocs) show = false;
        }
        
        card.style.display = show ? '' : 'none';
    });
    
    updateApplicationsCount();
}

/**
 * Initialisation des cartes de candidature
 */
function initApplicationCards() {
    const cards = document.querySelectorAll('.job-card');
    
    cards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Mettre à jour la progression
        updateProgressBar(card);
        
        // Vérifier l'urgence
        checkUrgentApplication(card);
    });
}

/**
 * Mettre à jour la barre de progression
 */
function updateProgressBar(card) {
    const progressBar = card.querySelector('.progress-bar .fill');
    const progressText = card.querySelector('.progress-text strong');
    
    if (!progressBar || !progressText) return;
    
    const progress = parseInt(progressText.textContent) || 0;
    progressBar.style.width = `${progress}%`;
    
    // Colorer en fonction de la progression
    if (progress < 30) {
        progressBar.style.backgroundColor = '#ef4444';
    } else if (progress < 70) {
        progressBar.style.backgroundColor = '#f59e0b';
    } else {
        progressBar.style.backgroundColor = '#10b981';
    }
}

/**
 * Vérifier les candidatures urgentes
 */
function checkUrgentApplication(card) {
    const badge = card.querySelector('.badge');
    const deadline = card.dataset.deadline;
    
    if (!badge || !deadline) return;
    
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Si la date limite est dans moins de 3 jours
    if (diffDays <= 3 && diffDays >= 0) {
        badge.classList.add('urgent');
        badge.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${badge.textContent}`;
        
        // Ajouter une animation
        badge.style.animation = 'pulse 2s infinite';
    }
    
    // Si la date limite est dépassée
    if (diffDays < 0) {
        badge.classList.add('expired');
        badge.innerHTML = `<i class="fas fa-clock"></i> Expirée`;
    }
}

/**
 * Initialisation de la pagination
 */
function initApplicationsPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;
            
            // Retirer la classe active de tous les boutons
            paginationBtns.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Charger la page
            const page = this.textContent.trim();
            loadApplicationsPage(page);
        });
    });
}

/**
 * Charger une page de candidatures
 */
function loadApplicationsPage(page) {
    const content = document.querySelector('.content');
    
    // Afficher le chargement
    content.style.opacity = '0.5';
    
    // Simuler le chargement
    setTimeout(() => {
        content.style.opacity = '1';
        
        // Mettre à jour l'URL
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        window.history.pushState({}, '', url);
        
        window.INSTI?.showToast(`Page ${page} chargée`, 'info');
    }, 500);
}

/**
 * Initialisation des boutons d'action
 */
function initApplicationActions() {
    // Bouton "Voir les détails"
    const detailBtns = document.querySelectorAll('.view-details');
    
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const applicationId = this.dataset.applicationId;
            if (applicationId) {
                window.location.href = `/teacher/application/${applicationId}`;
            }
        });
    });
    
    // Bouton "Télécharger"
    const downloadBtns = document.querySelectorAll('.btn-download');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const documentType = this.dataset.document;
            downloadApplicationDocument(documentType);
        });
    });
}

/**
 * Télécharger un document de candidature
 */
function downloadApplicationDocument(documentType) {
    // Simulation de téléchargement
    const fakeDocuments = {
        acceptance: {
            name: 'Lettre_Acceptation.pdf',
            size: '245KB'
        },
        decision: {
            name: 'Decision_Comite.pdf',
            size: '180KB'
        },
        receipt: {
            name: 'Accuse_Reception.pdf',
            size: '120KB'
        }
    };
    
    const doc = fakeDocuments[documentType] || { name: 'Document.pdf', size: '100KB' };
    
    // Créer un lien de téléchargement fictif
    const link = document.createElement('a');
    link.href = '#'; // Dans la réalité, ce serait l'URL du document
    link.download = doc.name;
    link.click();
    
    window.INSTI?.showToast(`Téléchargement de ${doc.name} (${doc.size})`, 'info');
}

/**
 * Initialisation du téléchargement
 */
function initApplicationDownloads() {
    // Rien de spécifique ici, géré dans initApplicationActions
}

/**
 * Initialisation des mises à jour en temps réel
 */
function initApplicationsRealTime() {
    // Vérifier les mises à jour toutes les 30 secondes
    setInterval(checkApplicationUpdates, 30000);
    
    // Écouter les événements de mise à jour
    document.addEventListener('applicationUpdated', (e) => {
        updateApplicationCard(e.detail);
    });
}

/**
 * Vérifier les mises à jour des candidatures
 */
function checkApplicationUpdates() {
    // Simulation de vérification
    const shouldUpdate = Math.random() < 0.2; // 20% de chance
    
    if (shouldUpdate) {
        // Sélectionner une candidature au hasard
        const cards = document.querySelectorAll('.job-card');
        if (cards.length === 0) return;
        
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const applicationId = randomCard.dataset.applicationId;
        
        // Simuler une mise à jour
        simulateApplicationUpdate(applicationId, randomCard);
    }
}

/**
 * Simuler une mise à jour de candidature
 */
function simulateApplicationUpdate(applicationId, card) {
    const badge = card.querySelector('.badge');
    const progressBar = card.querySelector('.progress-bar .fill');
    const progressText = card.querySelector('.progress-text strong');
    
    if (!badge || !progressBar || !progressText) return;
    
    const currentProgress = parseInt(progressText.textContent) || 0;
    
    // Ne pas mettre à jour si déjà à 100%
    if (currentProgress >= 100) return;
    
    // Augmenter la progression
    const increment = Math.floor(Math.random() * 15) + 5; // 5-20%
    const newProgress = Math.min(currentProgress + increment, 100);
    
    // Mettre à jour la progression
    progressText.textContent = newProgress;
    progressBar.style.width = `${newProgress}%`;
    
    // Mettre à jour la couleur
    if (newProgress < 30) {
        progressBar.style.backgroundColor = '#ef4444';
    } else if (newProgress < 70) {
        progressBar.style.backgroundColor = '#f59e0b';
    } else {
        progressBar.style.backgroundColor = '#10b981';
    }
    
    // Mettre à jour le statut si la progression atteint 100%
    if (newProgress === 100 && !badge.classList.contains('green')) {
        // Déterminer le résultat (80% accepté, 20% rejeté)
        const isAccepted = Math.random() < 0.8;
        
        if (isAccepted) {
            badge.className = 'badge green';
            badge.textContent = 'Acceptée';
            
            // Afficher l'alerte de succès si elle n'existe pas déjà
            if (!card.nextElementSibling?.classList.contains('alert-success')) {
                const successAlert = createSuccessAlert(applicationId);
                card.after(successAlert);
            }
        } else {
            badge.className = 'badge red';
            badge.textContent = 'Rejetée';
        }
        
        // Déclencher un événement
        document.dispatchEvent(new CustomEvent('applicationStatusChanged', {
            detail: {
                applicationId,
                status: isAccepted ? 'accepted' : 'rejected',
                progress: newProgress
            }
        }));
        
        // Afficher une notification
        const appTitle = card.querySelector('.job-title h3')?.textContent || 'Candidature';
        window.INSTI?.showToast(
            `${appTitle} : ${isAccepted ? 'acceptée' : 'rejetée'}`,
            isAccepted ? 'success' : 'error'
        );
    }
    
    // Sauvegarder dans localStorage
    saveApplicationProgress(applicationId, newProgress);
}

/**
 * Créer une alerte de succès
 */
function createSuccessAlert(applicationId) {
    const alert = document.createElement('div');
    alert.className = 'alert-success';
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-circle-check"></i>
            <div>
                <strong>Félicitation ! Votre candidature a été acceptée</strong>
                <p>Vous recevrez prochainement un email avec les prochaines étapes.</p>
            </div>
        </div>
        <button class="btn-download" data-application="${applicationId}">
            <i class="fas fa-download"></i> Télécharger la lettre d'acceptation
        </button>
    `;
    
    // Ajouter l'événement de téléchargement
    const downloadBtn = alert.querySelector('.btn-download');
    downloadBtn.addEventListener('click', function() {
        downloadApplicationDocument('acceptance');
    });
    
    return alert;
}

/**
 * Sauvegarder la progression
 */
function saveApplicationProgress(applicationId, progress) {
    let applications = JSON.parse(localStorage.getItem('insti_applications') || '[]');
    const appIndex = applications.findIndex(app => app.id === applicationId);
    
    if (appIndex !== -1) {
        applications[appIndex].progress = progress;
        applications[appIndex].updatedAt = new Date().toISOString();
    } else {
        applications.push({
            id: applicationId,
            progress: progress,
            updatedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('insti_applications', JSON.stringify(applications));
}

/**
 * Mettre à jour une carte de candidature
 */
function updateApplicationCard(detail) {
    const card = document.querySelector(`[data-application-id="${detail.applicationId}"]`);
    if (!card) return;
    
    if (detail.progress !== undefined) {
        const progressText = card.querySelector('.progress-text strong');
        const progressBar = card.querySelector('.progress-bar .fill');
        
        if (progressText && progressBar) {
            progressText.textContent = detail.progress;
            progressBar.style.width = `${detail.progress}%`;
        }
    }
    
    if (detail.status) {
        const badge = card.querySelector('.badge');
        if (badge) {
            badge.className = `badge ${detail.status}`;
            badge.textContent = detail.status === 'green' ? 'Acceptée' : 
                               detail.status === 'red' ? 'Rejetée' : 'En examen';
        }
    }
}

/**
 * Charger les candidatures
 */
function loadApplications() {
    // Simulation de chargement (dans la réalité, ce serait une requête AJAX)
    setTimeout(() => {
        // Initialiser les barres de progression
        document.querySelectorAll('.job-card').forEach(updateProgressBar);
        
        // Vérifier les urgences
        document.querySelectorAll('.job-card').forEach(checkUrgentApplication);
        
        // Mettre à jour le compteur
        updateApplicationsCount();
    }, 100);
}
